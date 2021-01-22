const { StatusCodes } = require('http-status-codes');
const { hash } = require('bcryptjs');

const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const db = require('../../models');
const { userRepository } = require('../../repositories');

module.exports= {
  create: async(params) => {
    
    const { email } = params;
    
    const findUser = await userRepository.find({ email });

   
    if(findUser.length > 0) {
      throw new ApplicationError(messages.alreadyExists('email'), StatusCodes.CONFLICT);
    }


    const response = await db.sequelize.transaction( async (transaction)=> {

      const newUser = {
        ...params,
      }
      
      const user = await userRepository.create(newUser, transaction);
      return user;
    });
    
    return response;
    
   
  },
};
