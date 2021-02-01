const { Genre } = require('../models');

module.exports = {
  findOne: (params = '') => Genre.findOne({ where: params }),
  find: (params = '') => Genre.findAll({ where: params }),
  findById: id => Genre.findByPk(id),
  create: params => Genre.create(params),
  update: genre => genre.save(),
};
