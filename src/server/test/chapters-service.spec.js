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
    describe('getAllChapters()', () => {
        it('should return an empty array', () => {
            return ChaptersService
            .getAllChapters(db)
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
            it('should return all chapters', () => {
                
                return ChaptersService
                .getAllChapters(db)
                .then(chapters => {
                expect(chapters).to.be.a('array');
                expect(chapters).to.have.lengthOf(4);
                })    
            })
        })
    })

    describe('getById()', () => {
        it('should return undefined', () => {
            return ChaptersService
            .getById(db, 999)
            .then(chapters => expect(chapters).to.be.undefined)
        })
        context('there is data', () => {
            beforeEach('insert data into books', () => db('books').insert(testBooks))
            beforeEach('insert data into chapters', () => db('chapters').insert(testChapters))
            it('should return the existing chapter', () => {
                const id = 1;
                const expectedChapter = testChapters.find(chapter => chapter.id === id)
                return ChaptersService
                .getById(db, id)
                .then(chapters => {
                    expect(chapters).to.eql(expectedChapter);
                })
            })
            it('should return undefined for nonexistent book', () => {
                const id = 55;
                
                return ChaptersService
                .getById(db, id)
                .then(chapters => {
                    expect(chapters).to.be.undefined;
                })
            })
        })
    })
    describe('getByBookId()', () => {
        it('should return an empty array', () => {
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
            it('should return the chapters for the book', () => {
                const book_id = 1;
                
                return ChaptersService
                .getByBookId(db, book_id)
                .then(chapters => {
                    expect(chapters).to.be.a('array');
                    expect(chapters).to.have.lengthOf(2);
                    expect(chapters).to.eql(expectedChapters)
                })
            })
            it('should return an empty array for a book that doesn\'t exist', () => {
                return ChaptersService
                .getByBookId(db, 999)
                .then(chapters => {
                    expect(chapters).to.be.a('array');
                    expect(chapters).to.have.lengthOf(0);
                })
            });
        })
    })
    
})