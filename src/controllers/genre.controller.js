const { StatusCodes } = require('http-status-codes');
const { catchAsync } = require('../utils');
const { genreService } = require('../services');

module.exports = {
  create: catchAsync(async (req, res) => {
    const { genre } = req.body;

    const params = {
      loginUser: req.user,
      genre,
    };

    const response = await genreService.create(params);

    return res.status(StatusCodes.CREATED).json(response);
  }),
};
