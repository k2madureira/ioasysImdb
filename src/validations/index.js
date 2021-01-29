const { users } = require('./user.validation');
const { isAdmin } = require('./admin.validation');
const { movies } = require('./movie.validation');
const { scores } = require('./score.validation');

module.exports.validationSchemas = {
  users,
  movies,
  isAdmin,
  scores,
};
