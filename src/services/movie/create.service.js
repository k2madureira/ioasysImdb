const { StatusCodes } = require('http-status-codes');

const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const { movieRepository } = require('../../repositories');

const db = require('../../models');

module.exports = {
  create: async params => {
    const { tt } = params;
    const findMovie = await movieRepository.findOne({ tt });

    if (findMovie) {
      throw new ApplicationError(
        messages.alreadyExists('movie'),
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

    return response;
  },
};
