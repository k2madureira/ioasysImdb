const { users } = require('./user.validation');
const { isAdmin } = require('./admin.validation');

module.exports.validationSchemas = {
  users,
  isAdmin,
};
