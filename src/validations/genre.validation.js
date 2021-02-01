const yup = require('yup');

const create = {
  body: yup.object().shape({
    genre: yup.string().max(255).required(),
  }),
};

module.exports.genres = {
  create,
};
