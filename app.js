var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//pokemon router
var pokemonRouter = require('./routes/pokemon');
var pokemonSearchRouter = require('./routes/pokemon-search');
var pokemonPage = require('./routes/pokemon-page');
var pokemonItem = require('./routes/item');
var itemSearchRouter = require('./routes/item-search');
var itemPage = require('./routes/item-page');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/pokemon', pokemonRouter);
app.use('/pokemon-search', pokemonSearchRouter);
app.use('/pokemon-page', pokemonPage);
app.use('/users', usersRouter);
app.use('/item', pokemonItem);
app.use('/item-search', itemSearchRouter);
app.use('/item-page', itemPage);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
