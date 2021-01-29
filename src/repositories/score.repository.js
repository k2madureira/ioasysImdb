const { Score } = require('../models');

module.exports = {
  find: (params = '') => Score.findAll({ where: params }),
  create: params => Score.create(params),
};
