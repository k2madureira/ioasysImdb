const { Op } = require('sequelize');
const { movieRepository } = require('../../repositories');

module.exports.list = async (title, page, limit) => {
  const pageQuery = page - 1;
  const query = title !== '' ? { title: { [Op.iLike]: `%${title}%` } } : '';
  const attributes = ['id', 'tt', 'title', 'year', 'director', 'actors'];

  const movies = await movieRepository.find(
    query,
    attributes,
    limit,
    pageQuery,
  );

  const allMovies = await movieRepository.findAll();
  const totalMovies = allMovies.length;

  const totalPage = Math.ceil(totalMovies / limit);

  const response = {
    movies: movies.rows,
    pagination: {
      movies: totalMovies,
      limit,
      totalPages: totalPage,
      currentPage: page,
    },
  };

  return response;
};
