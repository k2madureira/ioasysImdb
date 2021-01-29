const { Op } = require('sequelize');
const { movieRepository } = require('../../repositories');
const { pagination } = require('../../utils');

module.exports.list = async (title, page, limit) => {
  const query = title !== '' ? { title: { [Op.iLike]: `%${title}%` } } : '';

  const movies = await movieRepository.find(query, limit, page);

  const pageDetail = pagination(page, limit, movies, 'movies');

  const response = {
    movies,
    pagination: pageDetail.pagination,
  };

  return response;
};
