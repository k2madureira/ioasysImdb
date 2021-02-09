const Mail = require('../../utils/mailer');

module.exports.registrationMail = {
  key: 'RegistrationMail',
  async handle({ data }) {
    const { user, parseTemplate } = data;
    await Mail.sendMail({
      from: 'no-replay@imdb.com',
      to: user.email,
      subject: '[IMDB] Create account',
      html: parseTemplate,
    });
  },
};
