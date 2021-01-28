const { Op } = require('sequelize');
const { movieRepository } = require('../../repositories');

module.exports.list = async title => {
  const query = title !== '' ? { title: { [Op.iLike]: `%${title}%` } } : '';

  return movieRepository.find(query);
};
