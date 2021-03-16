const knex = require('knex');
const BooksService = require('../services/booksService');

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

    describe('getAllBooks()', () => {
        it('returns an empty array', () => {
            return BooksService
              .getAllBooks(db)
              .then(books => expect(books).to.eql([]));
          });
    })
})