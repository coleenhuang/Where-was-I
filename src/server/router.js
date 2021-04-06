const router = require('express').Router();
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');
const chaptersRouter = require('./routes/chapters');


router.use('/books', booksRouter);
router.use('/users', usersRouter);
router.use('/chapters', chaptersRouter);


module.exports = router