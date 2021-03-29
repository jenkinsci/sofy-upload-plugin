const sql = require("mssql");

const getDeviceGroupsList = async () => {
  const {
    recordset: deviceGroups,
  } = await sql.query`SELECT * from GroupOfDevices WHERE isDeleted = 'false'`;

  if (!deviceGroups.length) {
    throw Error("Device groups not found");
  }

  return deviceGroups;
};

module.exports = {
  getDeviceGroupsList,
};
