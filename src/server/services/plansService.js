const PlansService = {
    getByUserid(knex, user_id) {
        return knex('users').where('userid', user_id).first()
    },
    addBook(knex, user_id, book_id){
        return knex('reading_goal').insert({user_id, book_id}, ['id'])
    }
}

module.exports = PlansService