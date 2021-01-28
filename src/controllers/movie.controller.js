const { StatusCodes } = require('http-status-codes');
const { catchAsync } = require('../utils');
const { movieService } = require('../services');

module.exports = {
  create: catchAsync(async (req, res) => {
    const { body } = req;
    body.loginUser = req.user;

    const response = await movieService.create(body);

    return res.status(StatusCodes.CREATED).json(response);
  }),
};
