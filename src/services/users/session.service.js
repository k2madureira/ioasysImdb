const { StatusCodes } = require('http-status-codes');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');

const { userRepository } = require('../../repositories');
const authConfig = require('../../config/auth');

module.exports = {
  authenticate: async params => {
    const { email, password } = params;

    const findUser = await userRepository.find({ email });

    if (findUser.length <= 0) {
      throw new ApplicationError(
        messages.alreadyExists('email'),
        StatusCodes.NOT_FOUND,
      );
    }

    const userData = findUser[0].dataValues;

    if (userData.disabled === true) {
      throw new ApplicationError(
        messages.unauthorized('login'),
        StatusCodes.UNAUTHORIZED,
      );
    }

    const passwordMatched = await compare(password, userData.password);

    if (!passwordMatched) {
      throw new ApplicationError(
        messages.invalidPassword(),
        StatusCodes.CONFLICT,
      );
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userData.id,
      expiresIn,
    });

    const response = {
      user: {
        name: userData.name,
        email: userData.email,
      },
      token,
    };

    return response;
  },
};
