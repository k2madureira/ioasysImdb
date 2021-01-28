const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const { movieRepository } = require('../../repositories');

module.exports = {
  update: async (body, params) => {
    const movieId = params.id;
    const movie = await movieRepository.findById(movieId);

    if (!movie) {
      throw new ApplicationError(
        messages.notFound('movie'),
        StatusCodes.NOT_FOUND,
      );
    }

    Object.assign(movie, body);

    const response = await movieRepository.update(movie);
    return response;
  },
};
