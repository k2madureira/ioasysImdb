const { StatusCodes } = require('http-status-codes');
const { messages } = require('../helpers');
const { ApplicationError, catchAsync } = require('../utils');
const { userRepository } = require('../repositories');

module.exports = {
  admin: catchAsync(async (request, response, next) => {
    const idLoginUser = request.user.id;

    const findAdm = await userRepository.findOne({
      id: idLoginUser,
      admin: true,
    });

    if (!findAdm) {
      throw new ApplicationError(
        messages.unauthorized('You must be an administrator to do this task. '),
        StatusCodes.UNAUTHORIZED,
      );
    }

    return next();
  }),
};
