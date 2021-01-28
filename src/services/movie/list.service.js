const { movieRepository } = require('../../repositories');

module.exports.list = async () => {
  const movies = await movieRepository.find();

  return movies;
};
