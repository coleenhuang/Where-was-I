const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookControllers')

router.get('/', bookController.book_list);

module.exports = router;