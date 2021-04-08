const knex = require('knex');
const PlansService = require('../services/plansService');
const {makeUsersArray} = require('./users.fixtures');
const {makePlansArray} = require("./plans.fixtures");
const {makeBooksArray} = require("./books.fixtures");
const { expect } = require('chai');

describe('Plans Service Object', () => {
    let db;
    before('setup db', () => {
        db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
        });
    });

    before('clean db', () => db.raw('TRUNCATE users, books, chapters, reading_goal RESTART IDENTITY CASCADE'));
    beforeEach('clean db', () => db.raw('TRUNCATE users, books, chapters, reading_goal RESTART IDENTITY CASCADE'));

    after('destroy db connection', () => db.destroy());

    const testUsers = makeUsersArray();
    const testBooks = makeBooksArray();
    const testPlans = makePlansArray();

    describe('getByUserid()', () => {
        it('should return an empty array', () => {
            const userid = 'hjkhsjk'
            return PlansService.getByUserId(db, userid)
            .then(plans => {
                expect(plans).to.be.a('array');
                expect(plans).to.have.lengthOf(0)
            })
        })
        context('there is data', ()=> {
            beforeEach(() => 
                db('users').insert(testUsers)
                .then(() => db('books').insert(testBooks))
                .then(() => db('reading_goal').insert(testPlans))
                )
            it('should return plans', () => {
                const userid = 'legolas1234';
                const expectedPlans = [
                    {   
                        id: 1,
                        book_name: "Genesis",
                        book_id: 1,
                        user_id: 'legolas1234'
                    },
                    {
                        id: 2,
                        book_id: 2,
                        book_name: "Exodus",
                        user_id: 'legolas1234'
                    }
                    ]
                return PlansService.getByUserId(db, userid)
                .then(plans => {
                    expect(plans).to.be.a('array');
                    expect(plans).to.eql(expectedPlans);
                })
            })   
        })
    })
})