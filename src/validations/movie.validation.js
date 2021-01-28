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

const update = {
  body: yup.object().shape({
    tt: yup.string(),
    title: yup.string(),
    year: yup.string(),
    director: yup.string(),
    genre: yup.string(),
    actors: yup.string(),
  }),
  params: yup.object().shape({
    id: yup.string().uuid('id param with invalid uuid').required(),
  }),
};

const del = {
  params: yup.object().shape({
    id: yup.string().uuid('id param with invalid uuid').required(),
  }),
};

module.exports.movies = {
  get,
  create,
  update,
  del,
};
