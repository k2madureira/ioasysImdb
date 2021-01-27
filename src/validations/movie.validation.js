const yup = require('yup');

const get = {
  params: yup.object().shape({
    id: yup.string().uuid(),
  }),
};

const create = {
  body: yup.object().shape({
    tt: yup.string().required(),
    title: yup.string(),
    year: yup.string(),
    director: yup.string(),
    genre: yup.string(),
    actors: yup.string(),
  }),
};

module.exports.movies = {
  get,
  create,
};
