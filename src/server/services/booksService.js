const BooksService = {
    getAllBooks(knex) {
        return knex('books').select('*')
    },
    getByTestament(knex, testament) {
        return knex('books').select('*').where({testament})
    },
    getById(knex, id) {
        return knex('books').where('id', id).first()
    }
}

module.exports = BooksService