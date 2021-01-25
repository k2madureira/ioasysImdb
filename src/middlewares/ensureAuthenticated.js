const { verify } = require('jsonwebtoken');
const { messages } = require('../helpers');
const { StatusCodes } = require('http-status-codes');
const { ApplicationError, catchAsync } = require('../utils');
const authConfig = require('../config/auth');

module.exports = {

  auth: catchAsync(async (request, response, next) =>{
    
      
      const authHeader = request.headers.authorization;

      if(!authHeader){
        throw new ApplicationError(messages.authMissing, StatusCodes.BAD_REQUEST)
      }
    
      try {
        const [ , token] = authHeader.split(' ');
      
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded;

        request.user = {
          id: sub,
        }

        return next();

      } catch (error) {
        throw new ApplicationError(messages.invalidToken, StatusCodes.BAD_REQUEST)
      }
      
  }),
};