const { Op } = require('sequelize');
const { genreRepository } = require('../../repositories');

module.exports.list = async (genre, page, limit) => {
  page = page === 0 ? 1 : page;
  const pageQuery = page - 1;
  const query = genre !== '' ? { genre: { [Op.iLike]: `%${genre}%` } } : '';
  const attributes = ['id', 'genre'];

  const genres = await genreRepository.find(
    query,
    attributes,
    limit,
    pageQuery,
  );

  const totalGenres = genres.count;
  const totalPage = Math.ceil(totalGenres / limit);

  const response = {
    genres: genres.rows,
    pagination: {
      genres: totalGenres,
      limit,
      totalPages: totalPage,
      currentPage: page,
    },
  };

  return response;
};
