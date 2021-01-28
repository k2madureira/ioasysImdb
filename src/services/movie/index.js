const { get } = require('./get.service');
const { create } = require('./create.service');
const { update } = require('./update.service');
const { destroy } = require('./destroy.service');

module.exports = {
  get,
  create,
  update,
  destroy,
};
