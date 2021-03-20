const knex = require('knex');
const { makeUsersArray } = require('./users.fixtures');
const UsersService = require('../services/usersService');
const { expect } = require('chai');

describe('Users Service Object', () => {
    let db;
    before('setup db', () => {
        db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
        });
    });

    before('clean db', () => db.raw('TRUNCATE users, books, chapters, verses, reading_goal, read_verses RESTART IDENTITY CASCADE'));
    afterEach('clean db', () => db.raw('TRUNCATE users, books, chapters, verses, reading_goal, read_verses RESTART IDENTITY CASCADE'));

    after('destroy db connection', () => db.destroy())

    const testUsers = makeUsersArray();

    describe('getAllUsers()', () => {
        it('should return an empty array', () => {
            return UsersService
            .getAllUsers(db)
            .then(users => {
                expect(users).to.be.a('array');
                expect(users).to.have.lengthOf(0)
            })
        })
        context('there is data', () => {
            beforeEach(() => db('users').insert(testUsers));

            it('returns array of all users', () => {
                return UsersService
                .getAllUsers(db)
                .then(users => {
                    expect(users).to.eql(testUsers)
                })
            })
        })
    })
})