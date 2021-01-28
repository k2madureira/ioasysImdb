const { Movie } = require('../models');

module.exports = {
  find: (params = '') => Movie.findAll({ where: params }),
  findOne: (params = '') => Movie.findOne({ where: params }),
  findById: id => Movie.findByPk(id),
  create: params => Movie.create(params),
  update: movie => movie.save(),
  destroy: params => Movie.destroy({ where: params }),
};
