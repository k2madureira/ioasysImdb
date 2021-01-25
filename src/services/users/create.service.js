const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const db = require('../../models');
const { userRepository } = require('../../repositories');

module.exports = {
  create: async (params) => {
    const { email, idLoginUser, admin } = params;

    const findAdm = await userRepository.find({
      id: idLoginUser,
      admin: true,
    });

    if (findAdm.length === 0 && admin === true) {
      throw new ApplicationError(messages.unauthorized('You must be an administrator to register a user at the same level. '), StatusCodes.UNAUTHORIZED);
    }

    const findUser = await userRepository.find({ email });

    if (findUser.length > 0) {
      throw new ApplicationError(messages.alreadyExists('email'), StatusCodes.CONFLICT);
    }

    const response = await db.sequelize.transaction(async (transaction) => {
      const newUser = {
        ...params,
      };

      const user = await userRepository.create(newUser, transaction);
      return user;
    });

    return response;
  },
};
