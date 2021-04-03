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

exports.book_verses = function (req, res, next) {
    //Lists all the verses within the chapter
    const knexInstance = req.app.get('db');
    const limit = req.query.limit;
    const offset = req.query.offset;
    const book_id = req.params.book_id;
    
    if(limit) {
        if (limit > 100 || limit < 0) {
            res.status(404).json({
                error: {message: 'Please enter a limit that is between 0 and 100'}
            })
        }
    }
    if(offset && offset < 0) {
        res.status(404).json({
            error: {message: 'Please enter a offset that is greater than 0'}
        })
    }
    if (limit && offset) {
        VersesService.getByBook(knexInstance, book_id, limit, offset)
        .then(verses => res.json(verses))
        .catch(next)
    }
    else if (limit && !offset) {
        VersesService.getByBook(knexInstance, book_id, limit)
        .then(verses => res.json(verses))
        .catch(next)
    }
    else if (offset && !limit) {
        VersesService.getByBook(knexInstance, book_id, offset)
        .then(verses => res.json(verses))
        .catch(next)
    }
    else {
        VersesService.getByBook(knexInstance, book_id)
        .then(verses => res.json(verses))
        .catch(next)
    }
}
 
