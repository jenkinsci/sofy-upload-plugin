const { db } = require('../config/db');

const getReleasesList = async (applicationId, lastReleaseId, rows = 10) => {
  let pageQuery = '';
  if (lastReleaseId) {
    pageQuery += `AND ReleaseModelId < ${lastReleaseId}`;
  }

  const {
    recordset: releases,
  } = await db.request()
    .input('applicationId', applicationId)
    .query(`
      SELECT TOP(${rows})* from ReleaseModel 
      WHERE 
        ApplicationId = @applicationId 
        ${pageQuery}
      ORDER BY ReleaseModelId DESC
    `);

  return releases;
};

module.exports = { getReleasesList };
