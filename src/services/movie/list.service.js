const { Op } = require('sequelize');
const { movieRepository } = require('../../repositories');

module.exports.list = async (title, page, limit) => {
  const query = title !== '' ? { title: { [Op.iLike]: `%${title}%` } } : '';

  const movies = await movieRepository.find(query, limit, page);
  const totalPage = Math.ceil(movies.count / limit);

  const response = {
    movies: movies.rows,
    pagination: {
      movies: movies.count,
      limit,
      totalPages: totalPage,
      currentPage: page,
    },
  };

  return response;
};
