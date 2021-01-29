const { Movie } = require('../models');

module.exports = {
  find: (params = '', limit = 10, page = 0) =>
    Movie.findAll({ where: params, limit, offset: page }),
  findOne: (params = '') => Movie.findOne({ where: params }),
  findById: id => Movie.findByPk(id),
  create: params => Movie.create(params),
  update: movie => movie.save(),
  destroy: params => Movie.destroy({ where: params }),
};
