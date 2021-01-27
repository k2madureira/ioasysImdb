const { StatusCodes } = require('http-status-codes');

const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const { movieRepository } = require('../../repositories');

module.exports.get = async id => {
  const movie = movieRepository.findById(id);

  if (!movie) {
    throw new ApplicationError(
      messages.notFound('Movie'),
      StatusCodes.NOT_FOUND,
    );
  }

  return movie;
};
