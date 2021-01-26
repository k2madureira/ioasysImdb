const { catchAsync } = require('../utils');
const { userService } = require('../services');

module.exports = {
  authenticate: catchAsync(async (req, res) => {
    const { body } = req;

    const response = await userService.authenticate(body);

    return res.json(response);
  }),
};
