const { GenreMovie } = require('../models');

module.exports = {
  findOne: (query = '') => GenreMovie.findOne({ where: query }),
  findAll: (query = '') => GenreMovie.findAll({ where: query }),
  create: params => GenreMovie.create(params),
  update: genreMovie => genreMovie.save(),
  destroy: params => GenreMovie.destroy({ where: params }),
};
