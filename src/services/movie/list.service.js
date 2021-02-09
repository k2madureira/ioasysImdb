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

  const treated = [];
  movies.rows.map(movie => {
    const sumScores = movie.scores.reduce((obj, elem) => {
      if (!obj.sum) {
        obj = {
          sum: 0,
          count: 0,
          avg: 0,
        };
      }
      obj.sum += elem.score;
      obj.count += 1;
      obj.avg = obj.sum / obj.count;
      return obj;
    }, {});

    delete movie.dataValues.scores;

    treated.push({
      ...movie.dataValues,
      total_votes: sumScores.count,
      average_votes: sumScores.avg,
    });
    return movie;
  });

  const totalMovies = allMovies.length;

  const totalPage = Math.ceil(totalMovies / limit);

  const response = {
    movies: treated,
    pagination: {
      movies: totalMovies,
      limit,
      totalPages: totalPage,
      currentPage: page,
    },
  };

  return response;
};
