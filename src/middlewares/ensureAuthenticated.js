const { verify } = require('jsonwebtoken');
const { messages } = require('../helpers');
const { ApplicationError, catchAsync } = require('../utils');

module.exports = catchAsync((request, response, next) =>{
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new ApplicationError(messages.authMissing, StatusCodes.BAD_REQUEST)
  }
});