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
  create: async params => {
    const { tt, genre } = params;
    const findMovie = await movieRepository.findOne({ tt });

    if (findMovie) {
      throw new ApplicationError(
        messages.alreadyExists('tt movie'),
        StatusCodes.CONFLICT,
      );
    }

    const response = await db.sequelize.transaction(async transaction => {
      const newMovie = {
        ...params,
      };

      const movie = await movieRepository.create(newMovie, transaction);
      return movie;
    });

    genre.forEach(async genreId => {
      const findGenre = await genreRepository.findById(genreId);

      if (findGenre) {
        await db.sequelize.transaction(async transaction => {
          const newGenreMovie = {
            genre_id: genreId,
            movie_id: response.id,
          };

          await genreMovieRepository.create(newGenreMovie, transaction);
        });
      }
    });

    return response;
  },
};
