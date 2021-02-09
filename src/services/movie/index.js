const { detail } = require('./detail.service');
const { list } = require('./list.service');
const { create } = require('./create.service');
const { update } = require('./update.service');
const { destroy } = require('./destroy.service');

module.exports = {
  detail,
  list,
  create,
  update,
  destroy,
};
