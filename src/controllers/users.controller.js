const { StatusCodes } = require('http-status-codes');
const { catchAsync } = require('../utils');

module.exports = {
  create: catchAsync(async(request, response) => {
    const { name, email, nickname, password, admin = false } = request.body;

    return response.json({ name, email, nickname});
  }),

};
