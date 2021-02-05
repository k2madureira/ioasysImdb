const { StatusCodes } = require('http-status-codes');
const { catchAsync } = require('../utils');
const { reportService } = require('../services');

module.exports = {
  top: catchAsync(async (req, res) => {
    const { page = 1, top = 10 } = req.query;
    const movies = await reportService.top(page, top);

    return res.status(StatusCodes.OK).json(movies);
  }),
};
