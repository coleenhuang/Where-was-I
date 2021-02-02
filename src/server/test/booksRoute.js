const { expect } = require('chai');
const { pool } = require('../config')
const supertest = require('supertest');
const app = require('../app');

describe('Book routes', () => {
  before('clean the table', () => 
    pool.query('TRUNCATE users, books, chapters, read_chapters RESTART IDENTITY CASCADE')
  )
  afterEach('cleanup', () => 
    pool.query('TRUNCATE users, books, chapters, read_chapters RESTART IDENTITY CASCADE')
  )
  
  describe('GET /books', () => {
    context('Given no books', () => {
      it('should return 200 and an empty array', () => {
      return supertest(app)
        .get('/books')
        .expect(200, []);
      });
    })
  })
  
});