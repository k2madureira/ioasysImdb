const { users } = require('./users.routes');
const { movies } = require('./movies.routes');
const { scores } = require('./scores.routes');
const { genres } = require('./genres.routes');
const { reports } = require('./reports.routes');

module.exports = {
  users,
  movies,
  scores,
  genres,
  reports,
};
