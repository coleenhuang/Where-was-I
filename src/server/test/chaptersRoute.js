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

        const bookQuery = {
          text: 'INSERT INTO books(book_name) VALUES($1), ($2)',
          values: [testBooks[0].book_name, testBooks[1].book_name],
        }
        const chapterQuery = {
            text: 'INSERT INTO chapters(chapter_name, book_id) VALUES($1, $2), ($3, $4)',
            values: [testChapters[0].chapter_name, testChapters[0].book_id, testChapters[1].chapter_name, testChapters[1].book_id],
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

        const bookQuery = {
          text: 'INSERT INTO books(book_name) VALUES($1), ($2)',
          values: [testBooks[0].book_name, testBooks[1].book_name],
        }
        const chapterQuery = {
            text: 'INSERT INTO chapters(chapter_name, book_id) VALUES($1, $2), ($3, $4)',
            values: [testChapters[0].chapter_name, testChapters[0].book_id, testChapters[1].chapter_name, testChapters[1].book_id],
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
    })
  })
})