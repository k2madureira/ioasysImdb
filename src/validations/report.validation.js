const yup = require('yup');

const top = {
  query: yup.object().shape({
    top: yup.number(),
    page: yup.number().positive().min(1),
  }),
};

module.exports.reports = {
  top,
};
