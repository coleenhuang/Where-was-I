const knex = require('knex');
const supertest = require('supertest');
const app = require('../app');
const { makeBooksArray } = require('./books.fixtures');

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
})