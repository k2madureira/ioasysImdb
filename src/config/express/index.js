const express = require('express');
const { logger, ApplicationError, morgan } = require('../../utils');
const { messages } = require('../../helpers');
const { errorTracker, errorHandler } = require('../../middlewares');
require('dotenv').config();

const routes = require('../../routes');

const { port } = require('../env');
const { StatusCodes } = require('http-status-codes');

const app = express();

app.set('port', port || 3333);

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

Object.keys(routes).forEach((key) => app.use(`/api/imdb/${key}`, routes[key]));

app.use((req, res, next) => {
  next(new ApplicationError(messages.notFound('route'), StatusCodes.NOT_FOUND));
});

app.use(errorTracker);
app.use(errorHandler);

const unexpectedErrorCatcher = (error) => {
  logger.error(error);
  process.exit(1);
};

process.on('uncaughtException', unexpectedErrorCatcher);
process.on('unhandledRejection', unexpectedErrorCatcher);

module.exports = app;
