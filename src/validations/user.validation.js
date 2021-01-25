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


const session = {
  body: yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
   
  }),
};

module.exports.users = {
  get,
  create,
  session,
}
