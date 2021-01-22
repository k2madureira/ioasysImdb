const { verify } = require('jsonwebtoken');
const { messages } = require('../helpers');
const { ApplicationError, catchAsync } = require('../utils');
const authConfig = require('../config/auth');

module.exports = catchAsync((request, response, next) =>{
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new ApplicationError(messages.authMissing, StatusCodes.BAD_REQUEST)
  }

  const [ , token] = authHeader.split(' ');
  const decoded = verify(token, authConfig.jwt.secret);

  const { sub } = decoded;

  request.user = {
    id: sub,
  }

  return next();

});