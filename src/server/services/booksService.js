const BooksService = {
    getAllBooks(db) {
        return db('books').select('*')
    },
    getByTestament(db, testament) {
        return db('books').where('testament', testament)
    },
    getById(db, id) {
        return db('books').where('id', id).first()
    }
}

module.exports = BooksService