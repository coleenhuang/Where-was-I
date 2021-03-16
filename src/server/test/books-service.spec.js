const { expect } = require('chai');
const knex = require('knex');
const BooksService = require('../services/booksService');
const { makeBooksArray } = require('./books.fixtures');

describe('Books service object', () => {
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

    describe('getAllBooks()', () => {
        it('returns an empty array', () => {
            return BooksService
              .getAllBooks(db)
              .then(books => {
                expect(books).to.be.a('array');
                expect(books).to.have.lengthOf(0);
            });
          });
        context('there is data', () => {
            beforeEach('insert data into books', () => 
                db('books').insert(testBooks)
            )
            it('returns all books', () => {
                return BooksService
                .getAllBooks(db)
                .then(books => {
                    expect(books).to.be.a('array');
                    expect(books).to.eql(testBooks)
                    expect(books).to.have.lengthOf(4);
                })
            })
        })
    })
    describe('getByTestament()', () => {
        it('returns an empty array for OT', () => {
            return BooksService
            .getByTestament(db, 'Old')
            .then(books => {
                expect(books).to.be.a('array');
                expect(books).to.have.lengthOf(0);
            })
        })
        it('returns an empty array for NT', () => {
            return BooksService
            .getByTestament(db, 'New')
            .then(books => {
                expect(books).to.be.a('array');
                expect(books).to.have.lengthOf(0);
            })
        })
        context('there is data', () => {
            beforeEach('insert data into books', () => 
                db('books').insert(testBooks)
            )
            it('returns all OT books', () => {
                const expectedBooks = testBooks.filter(book => book.testament === 'Old')
                return BooksService
                .getByTestament(db, 'Old')
                .then(books => {
                    expect(books).to.be.a('array');
                    expect(books).to.eql(expectedBooks);
                    expect(books).to.have.lengthOf(2);
                })
            })
            it('returns all NT books', () => {
                const expectedBooks = testBooks.filter(book => book.testament === 'New')
                return BooksService
                .getByTestament(db, 'New')
                .then(books => {
                    expect(books).to.be.a('array');
                    expect(books).to.eql(expectedBooks);
                    expect(books).to.have.lengthOf(2);
                })
            })
        })
    })

    describe('getById()', () => {
        it('should return undefined', () => {
            return BooksService
            .getById(db, 999)
            .then(books => expect(books).to.be.undefined)
        })
        context('there is data', () => {
            beforeEach('insert data', () => db('books').insert(testBooks))
            it('should return the existing book', () => {
                const id = 1;
                const expectedBook = testBooks.find(book => book.id === id)
                return BooksService
                .getById(db, id)
                .then(books => {
                    expect(books).to.eql(expectedBook);
                })
            })
            it('should return undefined for nonexistent book', () => {
                const id = 55;
                
                return BooksService
                .getById(db, id)
                .then(books => {
                    expect(books).to.be.undefined;
                })
            })
        })
    })
})