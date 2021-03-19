const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookControllers')

router.get('/', bookController.list_books);

router.get('/:book_id', bookController.book_by_id);

router.get('/:book_id/chapters', bookController.book_chapters);


//FIXME: not implemented yet
//router.get('/:book_id/verses', bookController.book_verses)

module.exports = router;