const knex = require('knex');
const supertest = require('supertest');
const app = require('../app');
const { makeBooksArray } = require('./books.fixtures');
const { makeChaptersArray } = require('./chapters.fixtures');


describe('Chapters endpoints', () => {
    let db;

    before('make knex instance', () => {
        db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    });

    before('clean db', () => db.raw('TRUNCATE users, books, chapters, reading_goal RESTART IDENTITY CASCADE'));
    afterEach('clean db', () => db.raw('TRUNCATE users, books, chapters, reading_goal RESTART IDENTITY CASCADE'));

    after('disconnect from db', () => db.destroy());
    const testBooks = makeBooksArray();
    const testChapters = makeChaptersArray();

    describe('GET /api/chapters', () => {
        it('returns an empty array', () => {
            return supertest(app)
            .get('/api/chapters')
            .expect(200, [])
        })
        context('there is data', () => {
            beforeEach('insert data into books', () => 
                db('books').insert(testBooks)
            )
            beforeEach('insert data into chapters', () => 
                db('chapters').insert(testChapters)
            )
            it('responds with 200 and all of the books', () => {
                return supertest(app)
                  .get('/api/chapters')
                  .expect(200, testChapters)
              })
        })
    })

    describe('GET /api/chapters/:chapter_id', () => {
        const errorMessage = {
            error: {message: 'Chapter doesn\'t exist'}
        }
        it('returns an error', () => {
            return supertest(app)
            .get('/api/chapters/55')
            .expect(404, errorMessage)
        })
        context('there is data', () => {
            beforeEach('insert data into books', () => 
                db('books').insert(testBooks)
            )
            beforeEach('insert data into chapters', () => 
                db('chapters').insert(testChapters)
            )
            it('responds with 200 and the chapter', () => {
                const expectedChapter = testChapters[0]
                return supertest(app)
                .get('/api/chapters/1')
                .expect(200, expectedChapter)
            })
        })
    })


})