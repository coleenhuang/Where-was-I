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

    before('clean db', () => db.raw('TRUNCATE users, books, chapters, reading_goal RESTART IDENTITY CASCADE'));
    afterEach('clean db', () => db.raw('TRUNCATE users, books, chapters, reading_goal RESTART IDENTITY CASCADE'));

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
    describe('getById', () => {
        it('shoud return undefined', () => {
            return UsersService
            .getById(db, 99)
            .then(users => {
                expect(users).to.be.undefined
            })
        })
        context('there is data', () => {
            beforeEach('insert data', () => 
                db('users').insert(testUsers)
            )
            it('returns the user', () => {
                const userId = 1
                const expectedUser = testUsers.find(user => user.userid === userId)
                return UsersService
                .getById(db, userId)
                .then(users => {
                    expect(users).to.eql(expectedUser)
                })

            })
        })
    })
})