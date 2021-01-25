module.exports.messages = {
  notFound: (resource) => `${resource}-not-found`,
  alreadyExists: (param) => `${param}-already-registered`,
  invalidFields: 'invalid-fields',
  invalidPassword: 'invalid-password',
  expiredToken: 'expired-token',
  invalidAuthFormat: 'invalid-authorization-format',
  invalidToken: 'invalid-token',
  authMissing: 'missing-authorization-header',
  internalError: 'internal-server-error',
  unauthorized: (param) => `${param}-unauthorized`,
};
