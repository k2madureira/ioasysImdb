const { StatusCodes } = require('http-status-codes');
const { catchAsync } = require('../utils');
const { genreService } = require('../services');

module.exports = {
  list: catchAsync(async (req, res) => {
    const { genre = '', page = 1, limit = 10 } = req.query;
    const movies = await genreService.list(genre, page, limit);

    return res.status(StatusCodes.OK).json(movies);
  }),

  create: catchAsync(async (req, res) => {
    const { genre } = req.body;

    const params = {
      loginUser: req.user,
      genre,
    };

    const response = await genreService.create(params);

    return res.status(StatusCodes.CREATED).json(response);
  }),

  update: catchAsync(async (req, res) => {
    const { genre } = req.body;
    const { id } = req.params;

    const response = await genreService.update(genre, id);

    return res.status(StatusCodes.OK).json(response);
  }),

  delete: catchAsync(async (req, res) => {
    const { id } = req.params;

    await genreService.destroy(id);

    return res.status(StatusCodes.OK).json({
      message: 'Genre deleted with success.',
    });
  }),
};
