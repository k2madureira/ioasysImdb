const { StatusCodes } = require('http-status-codes');
const { catchAsync } = require('../utils');
const { userService } = require('../services');

module.exports = {
  get: catchAsync(async (req, res) => {
    const { id } = req.params;

    const response = await userService.get(id);

    return res.status(StatusCodes.OK).json(response);
  }),

  create: catchAsync(async (req, res) => {
    const { body } = req;
    body.loginUser = req.user;

    const response = await userService.create(body);

    return res.status(StatusCodes.CREATED).json(response);
  }),

  update: catchAsync(async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    body.loginUser = req.user;
    const idUpdatedUser = id;

    const response = await userService.update(body, idUpdatedUser);

    return res.status(StatusCodes.OK).json(response);
  }),

  delete: catchAsync(async (req, res) => {
    const { params } = req;

    params.loginUser = req.user;

    await userService.destroy(params);

    return res.status(StatusCodes.OK).json({
      message: 'User deleted with success.',
    });
  }),
};
