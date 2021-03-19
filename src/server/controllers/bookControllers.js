const BooksService = require('../services/booksService')
const ChaptersService = require('../services/chaptersService');

exports.list_books = function (req, res, next) {
    // add the conditional when the testament query is present
    const knexInstance = req.app.get('db')
    BooksService.getAllBooks(knexInstance)
      .then(books => {
        res.json(books)
      })
      .catch(next)
}

exports.book_by_id = function (req, res, next) {
    const knexInstance = req.app.get('db');
    const id = req.params.book_id
    BooksService.getById(knexInstance, id)
    .then(books => {
        if (!books) {
            res.status(404).json({
                error: {message: 'Book doesn\'t exist'}
            })
        }
        res.json(books)
    })
    .catch(next)
}

exports.book_chapters = function (req, res, next) {
    //Lists the chapters within the book
    const knexInstance = req.app.get('db');
    const id = req.params.book_id
    ChaptersService.getByBookId(knexInstance, id)
    .then(chapters => res.json(chapters))
    .catch(next)
}

/*const { pool } = require('../config');

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
    //Get all chapters of a specific book
    const bookId = req.params.book_id
    pool.query('SELECT * FROM chapters c, books b WHERE c.book_id = b.id AND b.id = $1', [bookId], (error, results) => {
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

exports.book_verses = function (req, res) {
    //Get all verses of a specific book
    //FIXME: NOT implemented yet
    const bookId = req.params.book_id
    pool.query('SELECT * FROM chap c, books b WHERE c.book_id = b.id AND b.id = $1', [bookId], (error, results) => {
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
}*/