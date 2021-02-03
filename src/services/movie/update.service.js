const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const {
  movieRepository,
  genreMovieRepository,
  genreRepository,
} = require('../../repositories');

const db = require('../../models');

module.exports = {
  update: async (body, id) => {
    const { genre } = body;
    const movie = await movieRepository.findById(id);

    if (!movie) {
      throw new ApplicationError(
        messages.notFound('movie'),
        StatusCodes.NOT_FOUND,
      );
    }

    Object.assign(movie, body);
    const response = await movieRepository.update(movie);

    genre.forEach(async genreId => {
      const findGenre = await genreRepository.findById(genreId);
      const findGenreMovie = await genreMovieRepository.findOne({
        genre_id: genreId,
        movie_id: response.id,
      });

      if (findGenre && !findGenreMovie) {
        await db.sequelize.transaction(async transaction => {
          const newGenreMovie = {
            genre_id: genreId,
            movie_id: id,
          };

          await genreMovieRepository.create(newGenreMovie, transaction);
        });
      }
    });

    const findAllGenreMovie = await genreMovieRepository.findAll({
      movie_id: id,
    });

    findAllGenreMovie.forEach(async genreMovie => {
      if (genre.indexOf(genreMovie.genre_id) === -1) {
        await genreMovieRepository.destroy({ id: genreMovie.id });
      }
    });

    const updatedMovie = await movieRepository.findById(id);

    return updatedMovie;
  },
};
