const { Movie } = require('../models')

module.exports = {
  find: (params = '') => Movie.findAll({ where: params }),
  findOne: (params = '') => Movie.findOne({ where: params }),
  findById: id => Movie.findByPk(id),
  create: params => Movie.create(params),
};