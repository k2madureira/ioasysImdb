const { StatusCodes } = require('http-status-codes');
const { catchAsync } = require('../utils');
const { userService } = require('../services');

module.exports = {
  create: catchAsync(async(req, res) => {
    const { body } = req;
    body.id_user = req.user.id;

    const response = await userService.create(body); 

    return res.json(response);
  }),

};
