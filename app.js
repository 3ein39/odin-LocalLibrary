const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config()
const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

const createRequire = require('module').createRequire;

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

mongoose.connect(`mongodb+srv://3ein39:${process.env.MONGODB_PASSWORD}@library.hkvky8v.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`)
    .then(() => console.log('Connected!'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

// The following line is the one that allows us to parse the request body
// (which is what we need to be able to read the contents of the form)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

/** The following line is the one that allows us to serve static files
 *  (like CSS and JS files) from the public folder.
 */
app.use(express.static(path.join(__dirname, 'public')));

// The following lines are the ones that allow us to use the routes we defined
// the paths are treated as prefixes to the paths defined in the routes
// i.e /users/ will be the prefix for all the routes defined in the users.js file
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
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
