const { Score } = require('../models');

module.exports = {
  findOne: (params = '') => Score.findOne({ where: params }),
  find: (params = '') => Score.findAll({ where: params }),
  create: params => Score.create(params),
};
