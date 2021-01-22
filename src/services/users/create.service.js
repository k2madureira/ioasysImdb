const { StatusCodes } = require('http-status-codes');
const { hash } = require('bcryptjs');

const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const db = require('../../models');
const { userRepository } = require('../../repositories');

module.exports= {
  create: async(params) => {
    const { email } = params;
    
    
    const findUser = await userRepository.get({
      email,
    });
    
    if(findUser) {
      throw new ApplicationError(messages.alreadyExists('email'), StatusCodes.CONFLICT);
    }


    try {
      const response = await db.sequelize.transaction( async (transaction)=> {

        const password = await hash(params.password, 8);
        
        const newUser = {
          ...params,
          passwordHash: password,
          disabled: 0,
        }
        
        const user = await userRepository.create(newUser, transaction);
        return user;
      });
     
      return response;
    } catch (err) {
      if(err.response) {
        throw new ApplicationError(err.response.data[0].mensagem, error.response.status);
      }
      return err;
    }
   
  },
};
