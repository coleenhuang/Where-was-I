require('dotenv').config();
process.env.TZ = 'UTC';

const { expect } = require('chai')

global.expect = expect;