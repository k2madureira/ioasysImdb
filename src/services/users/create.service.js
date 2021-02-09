const { StatusCodes } = require('http-status-codes');
const path = require('path');
const handlebars = require('handlebars');
const fs = require('fs');
const { messages } = require('../../helpers');
const { ApplicationError, queue } = require('../../utils');
const db = require('../../models');
const { userRepository } = require('../../repositories');

module.exports = {
  create: async params => {
    const { email, loginUser, admin = false } = params;

    if (!loginUser.admin && admin === true) {
      throw new ApplicationError(messages.notAdmin, StatusCodes.UNAUTHORIZED);
    }

    const findUser = await userRepository.findOne({ email });

    if (findUser) {
      throw new ApplicationError(
        messages.alreadyExists('email'),
        StatusCodes.CONFLICT,
      );
    }

    params.admin = params.admin ? params.admin : false;
    const response = await db.sequelize.transaction(async transaction => {
      const newUser = {
        ...params,
      };

      const user = await userRepository.create(newUser, transaction);
      return user;
    });

    const createUserTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      'helpers',
      'templates',
      'createUser.hbs',
    );

    const templateFileContent = await fs.promises.readFile(createUserTemplate, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFileContent);

    await queue.add('RegistrationMail', {
      user: {
        name: params.name,
        email,
      },
      parseTemplate: parseTemplate({
        title: 'New Account',
        email,
        name: params.name,
      }),
    });

    return response;
  },
};
