const sql = require("mssql");

const { db } = require("../config/db");

const getDeviceGroupsList = async () => {
  const {
    recordset: deviceGroups,
  } = await db.request().query(`SELECT * from GroupOfDevices WHERE isDeleted = 'false'`);

  if (!deviceGroups.length) {
    throw Error("Device groups not found");
  }

  return deviceGroups;
};

module.exports = {
  getDeviceGroupsList,
};
