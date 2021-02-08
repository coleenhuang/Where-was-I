const { pool } = require('../config');

exports.book_list = function (req, res) {
    //gets all books
    pool.query('SELECT * FROM books', (error, results) => {
        if (error) {
            throw(error)
        }
        res.status(200).json(results.rows)
    })
}

exports.specific_book = function (req, res) {
    //get specific book
    const bookId = req.params.book_id

    pool.query('SELECT * FROM books WHERE id = $1', [bookId], (error, results) => {
        if (error) {
            throw(error)
        }
        if (results.rows.length <= 0) {
            return res.status(404).json({
                error: { message: `Book doesn't exist` }
              })
        }
        res.status(200).json(results.rows)
    })
}