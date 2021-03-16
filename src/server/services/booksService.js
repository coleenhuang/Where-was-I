const BooksService = {
    getAllBooks(db) {
        return db('books').select('*')
    }
}

module.exports = BooksService