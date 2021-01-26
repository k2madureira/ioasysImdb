const { catchAsync } = require('../utils');
const { userService } = require('../services');

module.exports = {
  create: catchAsync(async (req, res) => {
    const { body } = req;

    const response = await userService.create(body);

    return res.json(response);
  }),

  update: catchAsync(async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    const idUpdatedUser = id;

    const response = await userService.update(body, idUpdatedUser);

    return res.json(response);
  }),
};
