const { StatusCodes } = require('http-status-codes');

const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const { movieRepository } = require('../../repositories');

module.exports.detail = async id => {
  const query = { id };
  const attributes = [
    'id',
    'tt',
    'title',
    'year',
    'director',
    'genre',
    'actors',
  ];

  const movie = await movieRepository.findScores(query, attributes);

  if (!movie) {
    throw new ApplicationError(
      messages.notFound('Movie'),
      StatusCodes.NOT_FOUND,
    );
  }

  const data = movie.dataValues;
  const { scores } = data;

  let sum = 0;
  let count = 0;

  scores.forEach(m => {
    sum += m.dataValues.score;
    count += 1;
  });

  delete data.scores;
  const response = {
    ...data,
    total_votes: count,
    average_votes: sum / count,
  };

  return response;
};
