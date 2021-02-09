const Queue = require('bull');

const { redis } = require('../config/env');

const { jobs } = require('../helpers');

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, redis),
  name: job.key,
  handle: job.handle,
}));

module.exports.queue = {
  queues,
  add(name, data) {
    const queue = this.queues.find(q => q.name === name);

    return queue.bull.add(data);
  },
  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);
      queue.bull.on('failed', (job, err) => {
        console.log('Job failed', queue.key, job.data);
        console.log(err);
      });
    });
  },
};
