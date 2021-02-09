const { create } = require('./create.service');
const { update } = require('./update.service');
const { destroy } = require('./destroy.service');
const { list } = require('./list.service');

module.exports = {
  create,
  update,
  destroy,
  list,
};
