var express = require('express');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var booksRouter = require('./routes/books');
var usersRouter = require('./routes/users');
var chaptersRouter = require('./routes/chapters');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/books', booksRouter);
app.use('/users', usersRouter);
app.use('/chapters', chaptersRouter);

//Catch 404 and forward to error handler
app.use(function(req, res, next){
    next(createError(404));
});

//error handler
app.use(function(err, req, res, next) {
    //set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //render the error page
    res.status(err.status || 500);
    res.render('error');

})



module.exports = app;