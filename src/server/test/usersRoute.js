const { expect } = require('chai');
const { pool } = require('../config');
const supertest = require('supertest');
const app = require('../app')
const {makeUsersArray} = require('./users.fixtures');
