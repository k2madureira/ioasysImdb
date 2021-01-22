const { User } = require('../models');

module.exports = {
  
  find: (params = '') => User.findAll({ where: params }),
  findById: (id) => User.findByPk(id),
  create: (params) => User.create(params),
};