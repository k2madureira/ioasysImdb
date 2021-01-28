const { StatusCodes } = require('http-status-codes');
const { catchAsync } = require('../utils');
const { movieService } = require('../services');

module.exports = {
  get: catchAsync(async (req, res) => {
    const { tt } = req.params;

    const movie = await movieService.get(tt);

    return res.status(StatusCodes.OK).json(movie);
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
