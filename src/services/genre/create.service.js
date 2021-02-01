const { StatusCodes } = require('http-status-codes');

const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const { genreRepository } = require('../../repositories');

const db = require('../../models');

module.exports = {
  create: async params => {
    const { genre } = params;
    const findGenre = await genreRepository.findOne({ genre });

    if (findGenre) {
      throw new ApplicationError(
        messages.alreadyExists('Genre'),
        StatusCodes.CONFLICT,
      );
    }

    const response = await db.sequelize.transaction(async transaction => {
      const newGenre = {
        ...params,
      };

      return genreRepository.create(newGenre, transaction);
    });

    return response;
  },
};
