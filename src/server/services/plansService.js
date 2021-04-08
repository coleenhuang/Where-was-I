const PlansService = {
    getByUserId(knex, user_id) {
        return (
            knex('reading_goal').join('books', 'reading_goal.book_id', '=', 'books.id')
            .where('user_id', user_id)
            .select('reading_goal.id', 'reading_goal.user_id','reading_goal.book_id', 'books.book_name')
            )
    },
    addBook(knex, user_id, book_id){
        return knex('reading_goal').insert({user_id, book_id}, ['id'])
    }
}

module.exports = PlansService