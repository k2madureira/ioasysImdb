const { verify } = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { messages } = require('../helpers');
const { ApplicationError, catchAsync } = require('../utils');
const authConfig = require('../config/auth');
const { userRepository } = require('../repositories');

module.exports = {
  auth: catchAsync(async (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new ApplicationError(messages.authMissing, StatusCodes.BAD_REQUEST);
    }

    try {
      const [, token] = authHeader.split(' ');

      const decoded = verify(token, authConfig.jwt.secret);

      const { sub } = decoded;

      const user = await userRepository.findById(sub);

      request.user = {
        id: sub,
        admin: user.admin,
      };

      return next();
    } catch (error) {
      throw new ApplicationError(
        messages.invalidToken,
        StatusCodes.BAD_REQUEST,
      );
    }
  }),
};
