const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const { genreRepository } = require('../../repositories');

module.exports = {
  destroy: async id => {
    const genre = await genreRepository.findById(id);

    if (!genre) {
      throw new ApplicationError(
        messages.notFound('genre'),
        StatusCodes.NOT_FOUND,
      );
    }
    const response = await genreRepository.destroy({ id: genre.id });

    return response;
  },
};
