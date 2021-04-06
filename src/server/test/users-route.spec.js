const {makeUsersArray}  = require('./users.fixtures');
const knex = require('knex');
const app = require('../app');
const supertest = require('supertest');


describe('Users Endpoints', () => {
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
    const testUsers = makeUsersArray();

    describe('GET api/users', () => {
        it('returns an empty array', () => {
            return supertest(app)
            .get('/api/users')
            .expect(200, [])
        })

        context('there is data', () => {
            beforeEach(() => db('users').insert(testUsers))
            it('returns all users', () => {
                return supertest(app)
                .get('/api/users')
                .expect(200, testUsers)
            })
        })        
    })
    describe('GET api/users/:user_id', () => {
        const errorMessage = {
            error: {message: 'User doesn\'t exist'}
        }
        it('returns an error', () => {
            return supertest(app)
            .get('/api/users/55')
            .expect(404, errorMessage)
        })

        context('there is data', () => {
            beforeEach(() => db('users').insert(testUsers))
            it('returns the expected user', () => {
                let userid = 'legolas1234'
                const expectedUser = testUsers.find(user => user.userid === userid)
                return supertest(app)
                .get(`/api/users/${userid}`)
            })
        })
    })
})