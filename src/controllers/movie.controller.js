const { StatusCodes } = require('http-status-codes');
const { catchAsync } = require('../utils');
const { movieService } = require('../services');

module.exports = {
  detail: catchAsync(async (req, res) => {
    const { id } = req.params;

    const movie = await movieService.detail(id);

    return res.status(StatusCodes.OK).json(movie);
  }),

  list: catchAsync(async (req, res) => {
    const { title = '', page = 1, limit = 10 } = req.query;
    const movies = await movieService.list(title, page, limit);

    return res.status(StatusCodes.OK).json(movies);
  }),

  create: catchAsync(async (req, res) => {
    const { body } = req;
    body.loginUser = req.user;

    const response = await movieService.create(body);

    return res.status(StatusCodes.CREATED).json(response);
  }),

  update: catchAsync(async (req, res) => {
    const { body, params } = req;
    body.loginUser = req.user;

    const response = await movieService.update(body, params.id);

    return res.status(StatusCodes.OK).json(response);
  }),

  delete: catchAsync(async (req, res) => {
    const { id } = req.params;

    await movieService.destroy(id);

    return res.status(StatusCodes.OK).json({
      message: 'Movie deleted with success.',
    });
  }),
};
