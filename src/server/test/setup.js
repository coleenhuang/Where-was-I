require('dotenv').config();
process.env.TZ = 'UTC';

const { expect } = require('chai')
const { supertest } = require('supertest')

global.expect = expect;
global.supertest = supertest;