const { Op } = require('sequelize');
const { movieRepository } = require('../../repositories');
const { pagination } = require('../../utils');

module.exports.list = async (title, page, limit) => {
  const query = title !== '' ? { title: { [Op.iLike]: `%${title}%` } } : '';

  const movies = await movieRepository.find(query);

  const response = pagination(page, limit, movies, 'movies');

  return response;
};
