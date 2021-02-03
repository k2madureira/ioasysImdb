const { Genre } = require('../models');

module.exports = {
  findOne: (params = '') => Genre.findOne({ where: params }),
  find: (query = '', attributes = [], limit = 10, page = 0) =>
    Genre.findAndCountAll({
      where: query,
      attributes,
      limit,
      offset: limit * page,
    }),
  findById: id => Genre.findByPk(id),
  create: params => Genre.create(params),
  update: genre => genre.save(),
  destroy: params => Genre.destroy({ where: params }),
};
