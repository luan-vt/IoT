var createError = require('http-errors');
var flash    = require('connect-flash');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var morgan = require('morgan');

var cookieParser = require('cookie-parser');
var passport = require('passport')
var session = require('express-session')
var LocalStrategy = require('passport-local').Strategy;

//Import models
var models = require("./models");
models.sequelize.sync().then(function(){
  console.log("Connecting to the database successfully.")
}).catch(function (err) {
  console.log(err, 'Something went wrong with the database.')
});

var app = express();

//Log request to the console
app.use(morgan('dev'));
//Read cookie (needed for auth)
app.use(cookieParser());
//Get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Passport authentication
app.use(session({
  secret: 'HwYfYZE]7rYuRB+>',
  resave: true,
  saveUninitialized: true,
  //cookie: {secure: true}
}));
app.use(passport.initialize());
app.use(passport.session());

//Current login user
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

//==========================================================
//Route
app.use(flash());
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api')

app.use('/assets', express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

require('./config/passport')(passport, models.user);

//==========================================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
