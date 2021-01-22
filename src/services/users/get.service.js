const { StatusCodes } = require('http-status-codes');

const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const { userRepository } = require('../../repositories');

module.exports.get = async (id) => {
  const user = await userRepository.getById(id);

  if(!user){
    throw new ApplicationError(messages.notFound('users'), StatusCodes.NOT_FOUND);
  }

  return user;
};