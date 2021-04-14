const { Application } = require('../models');

const createApplication = async ({
  packageName,
}) => {
  const app = await Application.create({
    packageName,
  });
  return app;
};

module.exports = { createApplication };
