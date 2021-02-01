const { Op } = require('sequelize');
const { movieRepository } = require('../../repositories');

module.exports.list = async (title, page, limit) => {
  const pageQuery = page - 1;
  const query = title !== '' ? { title: { [Op.iLike]: `%${title}%` } } : '';
  const attributes = [
    'id',
    'tt',
    'title',
    'year',
    'director',
    'genre',
    'actors',
  ];

  const movies = await movieRepository.find(
    query,
    attributes,
    limit,
    pageQuery,
  );
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
