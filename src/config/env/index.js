const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: process.env.NODE_ENV === 'test'
    ? path.join(__dirname, '../../../.env.test')
    : path.join(__dirname, '../../../.env'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  clientURL: process.env.CLIENT_URL,
  version: 'v1',
  secret: process.env.JWT_SECRET,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  resetTokenExpiresIn: process.env.RESET_TOKEN_EXPIRES_IN,
  urlToS3: process.env.URL,
  corsOptions: {
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
  email: {
    from: process.env.MAIL_FROM,
    auth: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  },
};
