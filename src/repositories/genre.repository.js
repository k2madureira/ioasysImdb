const { Genre } = require('../models');

module.exports = {
  findOne: (params = '') => Genre.findOne({ where: params }),
  find: (params = '') => Genre.findAll({ where: params }),
  create: params => Genre.create(params),
};
