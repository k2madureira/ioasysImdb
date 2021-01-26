const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const db = require('../../models');
const { userRepository } = require('../../repositories');

module.exports = {
  create: async params => {
    const { email, loginUser, admin } = params;

    if (!loginUser.admin && admin === true) {
      throw new ApplicationError(messages.notAdmin(), StatusCodes.UNAUTHORIZED);
    }

    const findUser = await userRepository.findOne({ email });

    if (findUser) {
      throw new ApplicationError(
        messages.alreadyExists('email'),
        StatusCodes.CONFLICT,
      );
    }

    const response = await db.sequelize.transaction(async transaction => {
      const newUser = {
        ...params,
      };

      const user = await userRepository.create(newUser, transaction);
      return user;
    });

    return response;
  },
};
