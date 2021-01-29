const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const { movieRepository } = require('../../repositories');

// const db = require('../../models');

module.exports = {
  create: async params => {
    const { id } = params;
    const findMovie = await movieRepository.findOne({ id });

    if (!findMovie) {
      throw new ApplicationError(
        messages.notFound('movie'),
        StatusCodes.CONFLICT,
      );
    }

    const response = findMovie;
    return response;
  },
};
