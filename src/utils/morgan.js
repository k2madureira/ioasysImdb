const morgan = require('morgan');
const { StatusCodes } = require('http-status-codes');
const { logger } = require('./logger');

morgan.token(
  'message',
  (request, response) => response.locals.errorMessage || ''
);

const getIPFormat = () =>
  process.env.NODE_ENV === 'production' ? ':remote-addr -' : '';
const successResponseFormat = `${getIPFormat()}:method :url - :status - :response-time ms - :date[iso]`;
const errorResponseFormat = `${getIPFormat()}:method :url - :status - :response-time ms - :date[iso]`;

const successHandler = morgan(successResponseFormat, {
  skip: (request, response) => response.statusCode < StatusCodes.BAD_REQUEST,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (request, response) => response.statusCode < StatusCodes.BAD_REQUEST,
  stream: { write: (message) => logger.error(message.trim()) },
});

module.exports.morgan = {
  successHandler,
  errorHandler,
};
