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
    context('No books in the db', () => {
      it('should return 200 and an empty array', () => {
      return supertest(app)
        .get('/books')
        .expect(200, []);
      });
    })
    context('Given there are books in the db', () => {
      const testBooks = makeBooksArray();
      const bookValues = []
      testBooks.forEach(book => {
        bookValues.push(book.book_name)
        bookValues.push(book.num_of_chapts)
      })
      const query = {
        text: 'INSERT INTO books(book_name, num_of_chapts) VALUES($1, $2), ($3, $4)',
        values: bookValues,
      }

      beforeEach(() => pool.query(query))

      it('responds with 200 and all the books', () => {
        return supertest(app)
        .get('/books')
        .expect(200, testBooks);
      })
    })
  })

  describe('GET /books/book_id', () => {
    context('No books in the db', () => {
      const bookId = 2
      it('responds with 404', () => {
        return supertest(app)
        .get(`/books/${bookId}`)
        .expect(404, {error: { message: 'Book doesn\'t exist'}})
      })
    })
    
    context('Given there are books in the db', () => {
      const testBooks = makeBooksArray();
      const bookValues = []
      testBooks.forEach(book => {
        bookValues.push(book.book_name)
        bookValues.push(book.num_of_chapts)
      })

      const query = {
        text: 'INSERT INTO books(book_name, num_of_chapts) VALUES($1, $2), ($3, $4)',
        values: bookValues,
      }

      beforeEach(() => pool.query(query))
      it('responds with 200 and the book with the correct id', () => {
        return supertest(app)
        .get('/books/2')
        .expect(200, [{
          id: 2,
          book_name: 'Exodus',
          num_of_chapts: 40
        }])
      }) 
      
      it('responds with a 404, bc no books with that id', () => {
        return supertest(app)
        .get('/books/23')
        .expect(404, {error: { message: 'Book doesn\'t exist'}})
      })
    })
  })
  
});