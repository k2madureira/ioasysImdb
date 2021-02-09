const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');

const { email } = require('../config/env');

module.exports.mailer = async params => {
  const account =
    process.env.NODE_ENV !== 'test'
      ? { user: email.auth.user, pass: email.auth.pass }
      : await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: email.auth.host || 'smtp.ethereal.email',
    port: email.auth.port || 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  const templateFileContent = await fs.promises.readFile(params.template, {
    encoding: 'utf-8',
  });

  const parseTemplate = handlebars.compile(templateFileContent);

  const info = await transporter.sendMail({
    from: params.from.address,
    to: params.to.address,
    subject: params.subject,
    html: parseTemplate(params.variables),
  });

  return info;
};
