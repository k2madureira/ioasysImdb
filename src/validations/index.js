const { users } = require('./user.validation');
const { isAdmin } = require('./admin.validation');
const { movies } = require('./movie.validation');
const { scores } = require('./score.validation');
const { genres } = require('./genre.validation');
const { reports } = require('./report.validation');

module.exports.validationSchemas = {
  users,
  movies,
  isAdmin,
  scores,
  genres,
  reports,
};
