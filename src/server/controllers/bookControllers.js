const BooksService = require('../services/booksService')
const ChaptersService = require('../services/chaptersService');

exports.list_books = function (req, res, next) {
    //Gives a list of books
    const knexInstance = req.app.get('db')
    let testament = req.query.testament
    if (!testament) {
        BooksService.getAllBooks(knexInstance)
      .then(books => {
        res.json(books)
      }).catch(next)
    }
    else {
        //filter by testament query if it is present
        if (testament !== 'Old' && testament !== 'New') {
            res.status(404).json({
                error: {message: 'Please enter either New or Old'}
            })
        }
       else {
            BooksService.getByTestament(knexInstance, testament)
            .then(books => {
                res.json(books)
            })
            .catch(next)
        }}
    
      
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

