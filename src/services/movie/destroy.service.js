const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const { movieRepository } = require('../../repositories');

module.exports = {
  destroy: async id => {
    const movie = await movieRepository.findById(id);

    if (!movie) {
      throw new ApplicationError(
        messages.notFound('movie'),
        StatusCodes.NOT_FOUND,
      );
    }

    const response = await movieRepository.destroy({ id });
    return response;
  },
};
