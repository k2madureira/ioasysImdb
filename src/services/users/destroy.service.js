const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const { userRepository } = require('../../repositories');

module.exports = {
  destroy: async params => {
    const { loginUser, id } = params;

    if (!loginUser.admin) {
      throw new ApplicationError(messages.notAdmin, StatusCodes.UNAUTHORIZED);
    }

    const user = await userRepository.findById(id);

    if (!user) {
      throw new ApplicationError(
        messages.notFound('user'),
        StatusCodes.NOT_FOUND,
      );
    }
    const response = await userRepository.destroy({ id: user.id });

    return response;
  },
};
