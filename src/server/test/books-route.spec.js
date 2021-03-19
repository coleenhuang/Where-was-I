const knex = require('knex');
const supertest = require('supertest');
const app = require('../app');
const { makeBooksArray } = require('./books.fixtures');
const { makeChaptersArray } = require('./chapters.fixtures');

describe('Books Endpoints', () => {
    let db;

    before('make knex instance', () => {
        db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    });

    before('clean db', () => db.raw('TRUNCATE users, books, chapters, verses, reading_goal, read_verses RESTART IDENTITY CASCADE'));
    afterEach('clean db', () => db.raw('TRUNCATE users, books, chapters, verses, reading_goal, read_verses RESTART IDENTITY CASCADE'));

    after('disconnect from db', () => db.destroy());

    const testBooks = makeBooksArray();
    const testChapters = makeChaptersArray();

    describe('GET /api/books', () => {
        it('returns an empty array', () => {
            return supertest(app)
            .get('/api/books')
            .expect(200, []);
          });
        context('there is data', () => {
            beforeEach('insert data into books', () => 
                db('books').insert(testBooks)
            )
            it('responds with 200 and all of the books', () => {
                return supertest(app)
                  .get('/api/books')
                  .expect(200, testBooks)
              })
        })
    })

    describe('GET /api/books/:book_id', () => {
        const errorMessage = {
            error: {message: 'Book doesn\'t exist'}
        }
        it('returns an error', () => {
            return supertest(app)
            .get('/api/books/1')
            .expect(404, errorMessage )
        })
        context('there is data', () => {
            beforeEach('insert data into books', () => 
                db('books').insert(testBooks)
            )
            it('responds with 200 and the book', () => {
                const expectedBook = testBooks[0]
                return supertest(app)
                .get('/api/books/1')
                .expect(200, expectedBook)
            })
            it('returns an error for a book that doesn\'t exist', () => {
                return supertest(app)
                .get('/api/books/999')
                .expect(404, errorMessage )
            })
        })
    })

    describe('GET /api/:book_id/chapters', () => {
        it('returns an empty array', () => {
            return supertest(app)
            .get('/api/books/1/chapters')
            .expect(200, []);
        })

        context('there is data', () => {
            beforeEach('insert data', () => 
                db('books').insert(testBooks)
                .then(() => db('chapters').insert(testChapters))
            )
            it('returns a list of chapters in that book', () => {
                const expectedChapters = [
                    {
                        id: 1,
                        chapter_name: 1,
                        num_of_verses: 31,
                        book_id: 1,
                        book_name: 'Genesis'
                    },
                    {
                        id: 2,
                        chapter_name: 2,
                        num_of_verses: 25,
                        book_id: 1,
                        book_name: 'Genesis'
                    }
                ]
                return supertest(app)
                .get('/api/books/1/chapters')
                .expect(200, expectedChapters)
            })

            it('returns an empty array', () => {
                return supertest(app)
                .get('/api/books/999/chapters')
                .expect(200, []);
            })
            
        })

    })
})