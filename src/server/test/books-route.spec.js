const { expect } = require('chai');
const knex = require('knex');
const app = require('../app');
const supertest = require('supertest');
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
})