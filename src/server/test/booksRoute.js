const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('Express App', () => {
  it('should return a message from GET /books', () => {
    return supertest(app)
      .get('/books')
      .expect(200, 'here');
  });
});