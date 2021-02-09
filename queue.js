require('dotenv').config();

const { queue } = require('./src/utils');

queue.process();
