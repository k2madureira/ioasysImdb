const nodemailer = require('nodemailer');

const { email } = require('../config/env');

async function create() {
  return nodemailer.createTestAccount();
}
const account =
  process.env.NODE_ENV !== 'test'
    ? { user: email.auth.user, pass: email.auth.pass }
    : create();

module.exports = nodemailer.createTransport({
  host: email.auth.host || 'smtp.ethereal.email',
  port: email.auth.port || 587,
  secure: false,
  auth: {
    user: account.user,
    pass: account.pass,
  },
});
