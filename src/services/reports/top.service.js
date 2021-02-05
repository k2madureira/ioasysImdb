const { movieRepository } = require('../../repositories');
const { compare } = require('../../utils');

module.exports.top = async (page, top) => {
  const pageQuery = page - 1;
  const attributes = ['id', 'tt', 'title', 'year', 'director', 'actors'];
  const query = '';

  const movies = await movieRepository.find(query, attributes, top, pageQuery);

  const allMovies = await movieRepository.findAll();
  const totalMovies = allMovies.length;
  const totalPage = Math.ceil(totalMovies / top);

  const avgScores = movies.rows.map(movie => {
    const sumScores = movie.scores.reduce((obj, elem) => {
      if (!obj.soma) {
        obj = {
          soma: 0,
          count: 0,
          avg: 0,
        };
      }
      obj.soma += elem.score;
      obj.count += 1;
      obj.avg = obj.soma / obj.count;
      return obj;
    }, {});

    const stars = '*'.repeat(sumScores.avg);

    const topObj = {
      id: movie.id,
      tt: movie.tt,
      title: movie.title,
      stars,
      average: sumScores.avg,
      votes: sumScores.count,
    };
    movie.avg = sumScores;
    return topObj;
  });

  avgScores.sort(compare);

  const response = {
    movies: avgScores,
    pagination: {
      movies: totalMovies,
      top,
      totalPages: totalPage,
      currentPage: page,
    },
  };

  return response;
};
