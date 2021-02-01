const { StatusCodes } = require('http-status-codes');

const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const { genreRepository } = require('../../repositories');

module.exports = {
  update: async (body, id) => {
    const { genre } = body;

    const findGenre = await genreRepository.findById(id);

    if (!findGenre) {
      throw new ApplicationError(
        messages.notFound('genre'),
        StatusCodes.NOT_FOUND,
      );
    }

    body.genre = genre.toLowerCase().trim();
    Object.assign(findGenre, body);

    const response = await genreRepository.update(findGenre);
    return response;
  },
};
