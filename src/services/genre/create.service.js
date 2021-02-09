const { StatusCodes } = require('http-status-codes');

const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const { genreRepository } = require('../../repositories');

const db = require('../../models');

module.exports = {
  create: async params => {
    const { genre } = params;
    const treatedGenre = genre.toLowerCase().trim();

    const findGenre = await genreRepository.findOne({ genre: treatedGenre });

    if (findGenre) {
      throw new ApplicationError(
        messages.alreadyExists('Genre'),
        StatusCodes.CONFLICT,
      );
    }

    const response = await db.sequelize.transaction(async transaction => {
      const newGenre = {
        genre: treatedGenre,
      };

      return genreRepository.create(newGenre, transaction);
    });

    return response;
  },
};
