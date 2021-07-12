const createError = require('http-errors');
const { db } = require('../config/db');

const { Release } = require('../models');

const getReleasesList = async (applicationId, page = 1, limit = 10) => {
    const releases = await Release.findAll({
        where: { applicationId },
        order: [['releaseId', 'DESC']],
        limit,
        offset: (page - 1) * limit,
    });

    return releases;
};

const createRelease = async (applicationId, {
    name, description, startDate, endDate,
}) => {
    const release = await Release.create({
        name, description, startDate, endDate,
    });
    return release;
};

const isOverlapping = async (appId, startDate, endDate, ignoreReleaseId) => {
    const { recordset: countResp } = await db
        .request()
        .input('appId', appId)
        .input('startDate', startDate)
        .input('endDate', endDate)
        .input('ignoreReleaseId', ignoreReleaseId)
        .query(`
        SELECT
            COUNT(*)
        FROM
            ReleaseModel
        WHERE
            ApplicationId = @appId
            AND
            ReleaseModelId != @ignoreReleaseId
            AND (
                (@startDate >= StartDate AND @startDate <= EndDate) -- start lies in some release
                OR
                (@endDate >= StartDate AND @endDate <= EndDate) -- end lies in some release
                OR
                (StartDate >= @startDate AND EndDate <= @endDate) -- start and end are including some release
            )
    `);

    return !!Object.values(countResp[0])[0];
};

const getReleaseById = async (releaseId) => {
    const { recordset: releaseResp } = await db.request().input('id', releaseId).query(`
        SELECT * from ReleaseModel WHERE ReleaseModelId = @id
    `);
    return releaseResp[0];
};

const updateRelease = async (
    releaseId,
    {
        name, description, startDate, endDate,
    },
) => {
    const targetRelease = await getReleaseById(releaseId);
    if (!targetRelease) {
        throw createError(400, 'Release doesn\'t exist against this ID');
    }

    const { ApplicationId } = targetRelease;

    const isOverlappingReleases = await isOverlapping(ApplicationId, startDate, endDate, releaseId);
    if (isOverlappingReleases) {
        throw createError(400, 'There is some overlappig release, please update your start/end dates');
    }

    const { rowsAffected } = await db
        .request()
        .input('name', name)
        .input('description', description)
        .input('startDate', startDate)
        .input('endDate', endDate)
        .input('releaseId', releaseId)
        .input('currentTime', new Date())
        .query(`
            UPDATE
                ReleaseModel
            SET
                ReleaseName = @name,
                ReleaseDescription = @description,
                StartDate = @startDate,
                EndDate = @endDate,
                UpdatedOn = @currentTime
            WHERE
                ReleaseModelId = @releaseId
        `);
    if (!rowsAffected[0]) {
        throw createError(500, 'Release could not be updated due to some reason.');
    }

    return getReleaseById(releaseId);
};

module.exports = { getReleasesList, updateRelease, createRelease };
