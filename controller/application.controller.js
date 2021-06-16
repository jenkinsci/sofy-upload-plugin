const { Application } = require("../models");

const createApplication = async ({ packageName }) => {
  const app = await Application.create({
    packageName,
    platformId: 1,
  });
  return app;
};

module.exports = { createApplication };
