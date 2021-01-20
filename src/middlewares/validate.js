const yup = require('yup');
const { StatusCodes } = require('http-status-codes');
const { ApplicationError } = require('../utils');
const { messages } = require('../helpers');

module.exports = (schema) => async (req, res, next) => {
  const requestObject = Object.fromEntries(
    Object.entries(req).filter(([key]) => ['query', 'params', 'body'].includes(key)),
  );

  try {
    const value = await yup
      .object()
      .shape(schema)
      .validate(requestObject, { stripUnknown: true, abortEarly: false });

    Object.assign(req, value);
    next();
  } catch (error) {
    const errors = {};
    error.inner.forEach((err) => {
      const [outerKey, innerKey] = err.path.split('.');
      errors[outerKey] = { [innerKey]: err.message };
    });
    next(new ApplicationError(messages.invalidFields, StatusCodes.BAD_REQUEST, true, '', errors));
  }
};
