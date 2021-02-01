const { users } = require('./users.routes');
const { movies } = require('./movies.routes');
const { scores } = require('./scores.routes');
const { genres } = require('./genres.routes');

module.exports = {
  users,
  movies,
  scores,
  genres,
};
