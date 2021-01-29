const yup = require('yup');

const create = {
  body: yup.object().shape({
    score: yup.number().positive().min(0).max(4).required(),
  }),
  params: yup.object().shape({
    id: yup.string().uuid('id param with invalid uuid').required(),
  }),
};

module.exports.scores = {
  create,
};
