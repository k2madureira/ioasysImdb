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

    const user = await userRepository.findOne({ email });

    if (!user) {
      throw new ApplicationError(
        messages.notFound('email'),
        StatusCodes.NOT_FOUND,
      );
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new ApplicationError(
        messages.invalidPassword,
        StatusCodes.CONFLICT,
      );
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const response = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return response;
  },
};
