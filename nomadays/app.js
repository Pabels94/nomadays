// Common requires
const express = require('express');
const path = require('path');
const multer = require('multer');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const expressSession = require('express-session');
const methodOverride = require('method-override');
const moment = require('moment');
const passport = require('passport');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');

// Configuration requires
const config = require('./config');
const passportConfiguration = require('./config/passport');



// Routes requires
const index = require('./routes/index');
const auth = require('./routes/auth');
const profile = require('./routes/profile');
const users = require('./routes/users');

require('./config/passport')(passport);


// Map global promise - get rid of warning
mongoose.Promise = global.Promise;


// Inizialize express
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/nomadays', {
  useMongoClient: true,
})
  .then(() => console.log('MongoDb connected...'))
  .catch(err => console.log(err));

// view engine setup
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Method overrride middelware
app.use(methodOverride('_method'));

app.use(expressSession({
  secret: 'secret-pass',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  app.locals.moment = moment;
  next();
});

app.use('/', index);
app.use('/auth', auth);
app.use('/profile', profile);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
