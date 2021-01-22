const { User } = require('../models');

module.exports = {
  get: (params) => User.findOne({ where: params }),
  getById: (id) => User.findByPk(id),
  create: (params) => User.create(params),
};