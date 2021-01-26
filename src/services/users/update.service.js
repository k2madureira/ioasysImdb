const { StatusCodes } = require('http-status-codes');
const { compare } = require('bcryptjs');
const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const { userRepository } = require('../../repositories');

module.exports = {
  update: async (body, idUpdatedUser) => {
    const { oldPassword, password } = body;

    const user = await userRepository.findById(idUpdatedUser);

    if (!user) {
      throw new ApplicationError(
        messages.notFound('user'),
        StatusCodes.NOT_FOUND,
      );
    }

    if (oldPassword) {
      const compareHash = await compare(oldPassword, user.password);

      if (!compareHash) {
        throw new ApplicationError(
          messages.invalidPassword,
          StatusCodes.CONFLICT,
        );
      }
    } else if (!oldPassword && password) {
      throw new ApplicationError(
        messages.notFound('fields (password / passwordConfirmation)'),
        StatusCodes.NOT_FOUND,
      );
    }

    Object.assign(user, body);

    return userRepository.update(user);
  },
};
