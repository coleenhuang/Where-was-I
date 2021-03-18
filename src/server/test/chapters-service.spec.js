const { expect } = require('chai');
const knex = require('knex');
const ChaptersService = require('../services/chaptersService');
const { makeChaptersArray } = require('./chapters.fixtures');
const { makeBooksArray } = require('./books.fixtures');

describe('Chapters service object', () => {
    let db;
    // Prepare the database connection using the `db` variable available
    // in the scope of the primary `describe` block. This means `db`
    // will be available in all of our tests.
    before('setup db', () => {
        db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
        });
    });

    // Before all tests run and after each individual test, empty the
    // database tables
    before('clean db', () => db.raw('TRUNCATE users, books, chapters, verses, reading_goal, read_verses RESTART IDENTITY CASCADE'));
    afterEach('clean db', () => db.raw('TRUNCATE users, books, chapters, verses, reading_goal, read_verses RESTART IDENTITY CASCADE'));

    // After all tests run, let go of the db connection
    after('destroy db connection', () => db.destroy());

    const testBooks = makeBooksArray();
    const testChapters = makeChaptersArray();

    describe('getByBookId', () => {
        it('should return undefined', () => {
            return ChaptersService
            .getByBookId(db, 999)
            .then(chapters => {
                expect(chapters).to.be.a('array');
                expect(chapters).to.have.lengthOf(0);
            })
        });
        context('there is data', () => {
            beforeEach('insert data into books', () => 
                db('books').insert(testBooks)
            )
            beforeEach('insert data into chapters', () => 
                db('chapters').insert(testChapters)
            )
            it('should return the chapters for the book', () => {
                const book_id = 1;
                
                return ChaptersService
                .getByBookId(db, book_id)
                .then(chapters => {
                    expect(chapters).to.be.a('array');
                    expect(chapters).to.have.lengthOf(2);
                })
            })
        })
    })
    
})