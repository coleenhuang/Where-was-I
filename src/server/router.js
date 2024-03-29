const router = require('express').Router();
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');
const chaptersRouter = require('./routes/chapters');
const plansRouter = require('./routes/plans')


router.use('/books', booksRouter);
router.use('/users', usersRouter);
router.use('/chapters', chaptersRouter);
router.use('/plans', plansRouter);

module.exports = router