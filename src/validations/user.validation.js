const yup = require('yup');

const get = {
  params: yup.object().shape({
    id: yup.string().uuid(),
  }),
};

const create = {
  body: yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    nickname: yup.string(),
    password: yup.string().required(),
    admin: yup.boolean(),
  }),
};

const update = {
  body: yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    nickname: yup.string(),
    oldPassword: yup.string(),
    password: yup.string(),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
    admin: yup.boolean(),
  }),
  params: yup.object().shape({
    id: yup.string().required(),
  }),
};

const session = {
  body: yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  }),
};

module.exports.users = {
  get,
  create,
  update,
  session,
};
