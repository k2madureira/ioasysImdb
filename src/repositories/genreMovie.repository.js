const { GenreMovie } = require('../models');

module.exports = {
  create: params => GenreMovie.create(params),
};
