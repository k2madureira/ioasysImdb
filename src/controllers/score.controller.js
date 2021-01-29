const { StatusCodes } = require('http-status-codes');
const { catchAsync } = require('../utils');
const { scoreService } = require('../services');

module.exports = {
  create: catchAsync(async (req, res) => {
    const { id } = req.params;
    const { score } = req.body;

    const params = {
      id,
      score,
    };

    const response = await scoreService.create(params);

    return res.status(StatusCodes.CREATED).json(response);
  }),
};
