const models = require('../../models');

module.exports = async () => {
  try {
    await models.sequelize.sync();
    await models.sequelize.close();

    process.exit();
  } catch (error) {
    throw new Error(error);
  }
};
