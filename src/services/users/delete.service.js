const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const { userRepository } = require('../../repositories');

module.exports = {
  del: async params => {
    const { loginUser, id } = params;

    if (!loginUser.admin) {
      throw new ApplicationError(
        messages.unauthorized(
          'You must be an administrator to delete a user. ',
        ),
        StatusCodes.UNAUTHORIZED,
      );
    }

    const user = await userRepository.findById(id);

    if (!user) {
      throw new ApplicationError(
        messages.notFound('user'),
        StatusCodes.NOT_FOUND,
      );
    }

    params.disabled = true;
    params.deletedAt = new Date();
    Object.assign(user, params);

    return userRepository.update(user);
  },
};
