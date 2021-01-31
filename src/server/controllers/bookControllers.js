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