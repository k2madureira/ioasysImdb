const yup = require('yup');

const create = {
  body: yup.object().shape({
    genre: yup.string().max(255).required(),
  }),
};

const update = {
  body: yup.object().shape({
    genre: yup.string().max(255).required(),
  }),
  params: yup.object().shape({
    id: yup.string().uuid('id param with invalid uuid').required(),
  }),
};
module.exports.genres = {
  create,
  update,
};
