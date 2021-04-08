const knex = require('knex');
const app = require('../app');
const {makeBooksArray} = require('./books.fixtures');
const {makeUsersArray} = require('./users.fixtures');
const {makePlansArray} = require('./plans.fixtures');



describe('Plans routes', () => {
    let db;

    before('make knex instance', () => {
        db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    });

    before('clean db', () => db.raw('TRUNCATE users, books, chapters, reading_goal RESTART IDENTITY CASCADE'));
    beforeEach('clean db', () => db.raw('TRUNCATE users, books, chapters, reading_goal RESTART IDENTITY CASCADE'));

    after('disconnect from db', () => db.destroy());
    const testBooks = makeBooksArray();
    const testUsers = makeUsersArray();
    const testPlans = makePlansArray();

    describe('GET /api/plans/:user_id', () => {
        it('should return an empty array', () => {
            const userId = 'hjkhsjk'
            return supertest(app)
            .get(`/api/plans/${userId}`)
            .expect(200, [])
        })

        context('there is data', ()=> {
            beforeEach(() => 
                db('users').insert(testUsers)
                .then(() => db('books').insert(testBooks))
                .then(() => db('reading_goal').insert(testPlans))
                )
            it('should return plans', () => {
                const userId = 'legolas1234';
                
                return supertest(app)
                .get(`/api/plans/${userId}`)
                .expect(200, [] )
            })   
        })
    })

    describe('POST /api/plans/:userid', () => {
        beforeEach(() => 
                db('users').insert(testUsers)
                .then(() => db('books').insert(testBooks))
                )
        it('should insert a user', () => {
            const testPlan = testPlans[0];
            return supertest(app)
            .post('/api/plans')
            .send(testPlan)
            .expect(201)
        })
    })

    
})