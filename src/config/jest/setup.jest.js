const models = require('../../models');

module.exports = async () => {
  try {
    await models.sequelize.sync();
  } catch (error) {
    throw new Error(error);
  }
};
