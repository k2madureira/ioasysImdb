const { Movie, Score } = require('../models');

module.exports = {
  find: (query = '', attributes = [], limit = 10, page = 0) =>
    Movie.findAndCountAll({
      where: query,
      attributes,
      include: [{ as: 'scores', model: Score }],
      limit,
      offset: limit * page,
    }),
  findAll: (query = '') => Movie.findAll({ where: query }),
  findOne: (query = '') => Movie.findOne({ where: query }),
  findById: id => Movie.findByPk(id),
  findScores: (query = '', attributes = []) =>
    Movie.findOne({
      where: query,
      attributes,
      include: [{ as: 'scores', model: Score }],
    }),
  create: params => Movie.create(params),
  update: movie => movie.save(),
  destroy: params => Movie.destroy({ where: params }),
};
