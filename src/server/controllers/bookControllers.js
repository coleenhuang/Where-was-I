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

exports.book_chapters = function (req, res) {
    //Get the chapters of a specific book
    const bookId = req.params.book_id
    pool.query('SELECT c.id, c.chapter_name, b.book_name FROM chapters c, books b WHERE c.book_id = b.id AND b.id = $1', [bookId], (error, results) => {
        if (error) {
            throw(error)
        }
        if (results.rows.length <= 0) {
            return res.status(404).json({
                error: { message: `Chapter doesn't exist` }
              })
        }

        res.status(200).json(results.rows)
    })
}