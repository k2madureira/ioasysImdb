const { User } = require('../models');

module.exports = {
  find: (params = '') => User.findAll({ where: params }),
  findOne: (params = '') => User.findOne({ where: params }),
  findById: id => User.findByPk(id),
  create: params => User.create(params),
  update: user => user.save(),
};
