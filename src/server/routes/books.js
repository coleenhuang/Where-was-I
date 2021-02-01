const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookControllers')

router.get('/', bookController.book_list);

router.get('/:book_id', bookController.specific_book);

module.exports = router;