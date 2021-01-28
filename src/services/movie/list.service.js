const { Op } = require('sequelize');
const { movieRepository } = require('../../repositories');

module.exports.list = async (title, page, limit) => {
  const result = [];
  const query = title !== '' ? { title: { [Op.iLike]: `%${title}%` } } : '';

  const movies = await movieRepository.find(query);
  const totalPage = Math.ceil(movies.length / limit);
  let count = page * limit - limit;
  const delimiter = count + limit;

  if (page <= totalPage) {
    for (let i = count; i < delimiter; i++) {
      if (movies[i] !== undefined) {
        result.push(movies[i]);
      }
      count++;
    }
  }

  const response = {
    movies: result,
    pagination: {
      movies: movies.length,
      limit,
      totalPages: totalPage,
      currentPage: page,
    },
  };

  return response;
};
