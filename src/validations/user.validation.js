const yup = require('yup');

const get = {
  params: yup.object().shape({
    id: yup.string().uuid(),
  }),
}

const create = {
  body: yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    nickname: yup.string(),
    password: yup.string().required(),
    admin: yup.boolean(),
  }),
};

module.exports.users = {
  get,
  create,
}
