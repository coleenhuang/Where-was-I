const { expect } = require('chai')
const knex = require('knex')
const { before } = require('mocha')
const VersesService = require('../services/versesService')
const { makeBooksArray } = require('./books.fixtures')
const {makeChaptersArray} = require('./chapters.fixtures')
const {makeVersesArray} = require('./verses.fixtures')

describe('Verses Service object', () => {
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
    const testVerses = makeVersesArray();

    describe('getAllVerses()', () => {
        it('returns an empty array', () => {
            return VersesService
            .getAllVerses(db)
            .then(verses => {
                expect(verses).to.be.a('array');
                expect(verses).to.have.lengthOf(0);
            });
        })
        context('there is data', () => {
            beforeEach('insert data', () => 
                db('books').insert(testBooks)
                .then(() => db('chapters').insert(testChapters))
                .then(() => db('verses').insert(testVerses))
            )
            
            it('returns all verses', () => {
                return VersesService
                .getAllVerses(db)
                .then(verses => {
                    expect(verses).to.be.a('array');
                    expect(verses).to.have.lengthOf(7);
                    expect(verses).to.eql(testVerses);
                });
            })
            it('returns 2 verses when limit is set to 2 and offset 1', () => {
                const expectedVerses = testVerses.slice(1,3);
                return VersesService
                .getAllVerses(db, 2, 1)
                .then(verses => {
                    expect(verses).to.be.a('array')
                    expect(verses).to.have.lengthOf(2)
                    expect(verses).to.eql(expectedVerses)
                })
            })
        })
    })
    describe('getById()', () => {
        it('shoud return undefined', () => {
            return VersesService
            .getById(db, 99)
            .then(verses => {
                expect(verses).to.be.undefined
            })
        })
        context('there is data', () => {
            beforeEach('insert data', () => 
                db('books').insert(testBooks)
                .then(() => db('chapters').insert(testChapters))
                .then(() => db('verses').insert(testVerses))
            )
            it('returns the verse', () => {
                const verseId = 3
                const expectedVerse = testVerses.find(verse => verse.id === verseId)
                return VersesService
                .getById(db, verseId)
                .then(verses => {
                    expect(verses).to.eql(expectedVerse)
                })

            })
            it('shoud return undefined', () => {
                return VersesService
                .getById(db, 99)
                .then(verses => {
                    expect(verses).to.be.undefined
                })
            })
        })
    })
})