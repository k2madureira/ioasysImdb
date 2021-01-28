const { StatusCodes } = require('http-status-codes');

const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const { movieRepository } = require('../../repositories');

module.exports.detail = async id => {
  const movie = movieRepository.findOne({ id });

  if (!movie) {
    throw new ApplicationError(
      messages.notFound('Movie'),
      StatusCodes.NOT_FOUND,
    );
  }

  return movie;
};
