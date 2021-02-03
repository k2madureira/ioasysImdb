const userRepository = require('./user.repository');
const movieRepository = require('./movie.repository');
const scoreRepository = require('./score.repository');
const genreRepository = require('./genre.repository');
const genreMovieRepository = require('./genreMovie.repository');

module.exports = {
  userRepository,
  movieRepository,
  scoreRepository,
  genreRepository,
  genreMovieRepository,
};
