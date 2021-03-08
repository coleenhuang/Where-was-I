const { pool } = require('../config');
const supertest = require('supertest');
const app = require('../app')
const {makeUsersArray} = require('./users.fixtures');


describe('User routes', () => {
    before('clean the table', () => 
    pool.query('TRUNCATE users, books, chapters RESTART IDENTITY CASCADE')
    )
    afterEach('cleanup', () => 
        pool.query('TRUNCATE users, books, chapters RESTART IDENTITY CASCADE')
    )

    describe('GET /api/users', () => {
        context('Given there are no users', () => {
            it('should return 200 and an empty array', () => {
                return supertest(app)
                  .get('/api/users')
                  .expect(200, []);
                });
        })
        context('Given there are users in the database', () => {
            const testUsers = makeUsersArray();
            const userValues = []
            testUsers.forEach(user => {
                userValues.push(user.username)
                userValues.push(user.email)
                userValues.push(user.userid)
            })
            const query = {
                text: 'INSERT INTO users(username, email, userid) VALUES($1, $2, $3), ($4, $5, $6), ($7, $8, $9)',
                values: userValues,
            }
            before(() => pool.query(query))

            it('should return 200 and a list of users', () => {
                return supertest(app)
                .get('/api/users')
                .expect(200, testUsers)
            })
        })
    })

    describe('GET /api/users/:user_id', () => {
        context('Given there are no users', () => {
            it('should return 200 and an empty array', () => {
                return supertest(app)
                  .get('/api/users/legolas1234')
                  .expect(404, {error: { message: 'User doesn\'t exist'}});
                });

            it('should return 404 and an error for an invalid userid', () => {
                return supertest(app)
                .get('/api/users/gollum1234')
                .expect(404, {error: { message: `User doesn't exist` }})
            })
        })

        context('Given there are users in the database', () => {
            const testUsers = makeUsersArray();
            const userValues = []
            testUsers.forEach(user => {
                userValues.push(user.username)
                userValues.push(user.email)
                userValues.push(user.userid)
            })
            const query = {
                text: 'INSERT INTO users(username, email, userid) VALUES($1, $2, $3), ($4, $5, $6), ($7, $8, $9)',
                values: userValues,
            }
            before(() => pool.query(query))

            it('should return 200 and the correct user', () => {
                return supertest(app)
                .get('/api/users/legolas1234')
                .expect(200, [testUsers[0]])
            })

            it('should return 404 and an error for an invalid userid', () => {
                return supertest(app)
                .get('/api/users/gollum1234')
                .expect(404, {error: { message: `User doesn't exist` }})
            })
        })
    })

    describe('POST /api/users', () => {
        const testUsers = makeUsersArray();
        const user = testUsers[0]
        
        it('should insert a new user into the database', () => {
            return supertest(app)
            .post('/api/users')
            .send({
                username: user.username,
                email: user.email,
                userid: user.userid
            })
            .set('Accept', 'application/json')
            .expect(201)
        })
        
    })
})