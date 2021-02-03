const { expect } = require('chai');
const { pool } = require('../config')
const supertest = require('supertest');
const { makeBooksArray } = require('./books.fixtures')
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
    context('Given there are books in the db', () => {
      const testBooks = makeBooksArray();
      const query = {
        text: 'INSERT INTO books(book_name) VALUES($1), ($2)',
        values: [testBooks[0].book_name, testBooks[1].book_name],
      }
      beforeEach(() => pool.query(query))

      it('responds with 200 and all the books', () => {
        return supertest(app)
        .get('/books')
        .expect(200, testBooks);
      })
    })
  })
  
});