/* eslint-disable no-undef */
const { Op } = require('sequelize');
const { movieRepository } = require('../../repositories');

module.exports.list = async title => {
  const movies =
    title !== ''
      ? await movieRepository.find({ title: { [Op.iLike]: `%${title}%` } })
      : await movieRepository.find();

  return movies;
};
