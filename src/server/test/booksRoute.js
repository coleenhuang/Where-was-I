const { expect } = require('chai');
const { pool } = require('../config')
const supertest = require('supertest');
const { makeBooksArray } = require('./books.fixtures');
const { makeChaptersArray, makeChaptersArrayWithBookname } = require('./chapters.fixtures')
const app = require('../app');

describe('Book routes', () => {
  before('clean the table', () => 
    pool.query('TRUNCATE users, books, chapters RESTART IDENTITY CASCADE')
  )
  afterEach('cleanup', () => 
    pool.query('TRUNCATE users, books, chapters RESTART IDENTITY CASCADE')
  )
  
  describe('GET /api/books', () => {
    context('No books in the db', () => {
      it('should return 200 and an empty array', () => {
      return supertest(app)
        .get('/api/books')
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
        .get('/api/books')
        .expect(200, testBooks);
      })
    })
  })

  describe('GET /api/books/:book_id', () => {
    context('No books in the db', () => {
      const bookId = 2
      it('responds with 404', () => {
        return supertest(app)
        .get(`/api/books/${bookId}`)
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
        .get('/api/books/2')
        .expect(200, [{
          id: 2,
          book_name: 'Exodus',
          num_of_chapts: 40
        }])
      }) 
      
      it('responds with a 404, bc no books with that id', () => {
        return supertest(app)
        .get('/api/books/23')
        .expect(404, {error: { message: 'Book doesn\'t exist'}})
      })
    })
  })

  describe('GET /api/books/:book_id/chapters', () => {
    context('Given there are no books in the db', () => {
      it('responds with 404 and a error message', () => {
        return supertest(app)
        .get('/api/books/1/chapters')
        .expect(404, {error: { message: 'Book doesn\'t exist'}})
      })
    })

    context('Given that there are books but no chapters in the db', () => {
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

      it('responds with 404 and a error message for a book that doesn\'t exist', () => {
        return supertest(app)
        .get('/api/books/22/chapters')
        .expect(404, {error: { message: 'Book doesn\'t exist'}})
      })

      it('responds with 200 and an empty array for books that exist', () => {
        return supertest(app)
        .get('/api/books/2/chapters')
        .expect(404, {error: { message: 'Book doesn\'t exist'}})
      })

    })

    context('Given that there are books and chapters in the db', () => {
      const testBooks = makeBooksArray();
      const testChapters = makeChaptersArray();

      const bookValues = []
      testBooks.forEach(book => {
          bookValues.push(book.book_name)
          bookValues.push(book.num_of_chapts)
      })
      const bookQuery = {
          text: 'INSERT INTO books(book_name, num_of_chapts) VALUES($1, $2), ($3, $4)',
          values: bookValues,
      }

      const chapterValues = []
      testChapters.forEach(chapter => {
          chapterValues.push(chapter.chapter_name)
          chapterValues.push(chapter.book_id)
      })

      const chapterQuery = {
          text: 'INSERT INTO chapters(chapter_name, book_id) VALUES($1, $2), ($3, $4), ($5, $6)',
          values: chapterValues
      }

      beforeEach(() => (async () => {
          const client = await pool.connect()
          try {
            await client.query('BEGIN')
            const res = await client.query(bookQuery)
            await client.query(chapterQuery)
            await client.query('COMMIT')
          } catch (e) {
            await client.query('ROLLBACK')
            throw e
          } finally {
            client.release()
          }
        })().catch(e => console.error(e.stack)))

      it('responds with 200 and the correct chapters for the book', () => {
        let expectedArray = makeChaptersArrayWithBookname().filter(chapter => chapter.book_name === 'Genesis')

        return supertest(app)
        .get('/api/books/1/chapters')
        .expect(200, expectedArray)
      })
      it('it responds with 404 and an error message for a book that doesn\'t exist', () => {
        return supertest(app)
        .get('/api/books/22/chapters')
        .expect(404, {error: { message: 'Book doesn\'t exist'}})
      })

    })
  })
  
});