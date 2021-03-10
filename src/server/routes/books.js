const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookControllers')

router.get('/', bookController.book_list);

router.get('/:book_id', bookController.specific_book);

router.get('/:book_id/chapters', bookController.book_chapters);

router.get('/:book_id/verses', bookController.book_verses)

module.exports = router;