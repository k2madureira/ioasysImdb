const { StatusCodes } = require('http-status-codes');
const { catchAsync } = require('../utils');
const { userService } = require('../services');

module.exports = {
  Authenticate: catchAsync(async(req, res) => {
    const { body } = req;

    const response = await userService.Authenticate(body); 

    return res.json(response);
  }),

};
