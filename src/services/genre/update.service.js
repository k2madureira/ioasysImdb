const { StatusCodes } = require('http-status-codes');

const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const { genreRepository } = require('../../repositories');

module.exports = {
  update: async (genre, id) => {
    const findGenre = await genreRepository.findById(id);

    if (!findGenre) {
      throw new ApplicationError(
        messages.notFound('genre'),
        StatusCodes.NOT_FOUND,
      );
    }

    genre = genre.toLowerCase().trim();
    Object.assign(findGenre, { genre });

    const response = await genreRepository.update(findGenre);
    return response;
  },
};
