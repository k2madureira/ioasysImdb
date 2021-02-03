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
    genre: yup.array().of(yup.string().uuid()).required(),
    actors: yup.string(),
  }),
};

const update = {
  body: yup.object().shape({
    tt: yup.string(),
    title: yup.string(),
    year: yup.string(),
    director: yup.string(),
    genre: yup.array().of(yup.string().uuid()),
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

const list = {
  query: yup.object().shape({
    limit: yup.number(),
    page: yup.number().positive().min(1),
  }),
};

module.exports.movies = {
  get,
  create,
  update,
  del,
  list,
};
