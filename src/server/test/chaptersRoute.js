const { expect } = require('chai');
const { pool } = require('../config');
const supertest = require('supertest');
const { makeBooksArray } = require('./books.fixtures');
const { makeChaptersArray } = require('./chapters.fixtures');
const app = require('../app');


describe('Chapter routes', () => {
    before('clean the table', () => 
    pool.query('TRUNCATE users, books, chapters, read_chapters RESTART IDENTITY CASCADE')
  )
  afterEach('cleanup', () => 
    pool.query('TRUNCATE users, books, chapters, read_chapters RESTART IDENTITY CASCADE')
  )

  describe('GET /chapters', () => {
    context('There are no chapters in the db', () => {
        it('should return 200 and an empty array', () => {
            return supertest(app)
              .get('/chapters')
              .expect(200, []);
            });
    })
    context('Given there are chapters in the db', () => {
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
            text: 'INSERT INTO chapters(chapter_name, book_id) VALUES($1, $2), ($3, $4)',
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
  
        it('responds with 200 and all the chapters', () => {
          return supertest(app)
          .get('/chapters')
          .expect(200, testChapters);
        })
      })
  })

  describe('GET /chapters/chapter_id', () => {
    context('No chapters in the db', () => {
      const chapter_id = 1
      it('responds with 404', () => {
        return supertest(app)
        .get(`/chapters/${chapter_id}`)
        .expect(404, {error: { message: 'Chapter doesn\'t exist'}})
      })
    })
    
    context('Given there are chapters in the db', () => {
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
            text: 'INSERT INTO chapters(chapter_name, book_id) VALUES($1, $2), ($3, $4)',
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
      
      it('responds with a 404, bc no chapters with that id', () => {
        return supertest(app)
        .get('/chapters/26')
        .expect(404, {error: { message: 'Chapter doesn\'t exist'}})
      })

      it('responds with 200 and the chapter of that id', () => {
          return supertest(app)
          .get('/chapters/2')
          .expect(200, [{
              id: 2,
              chapter_name: 1,
              book_name: 'Exodus'
          }])
      })
    })
  })
})