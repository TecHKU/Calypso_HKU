var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose= require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');
var login=require('./routes/login');
var signup=require('./routes/signup');
var getTags=require('./routes/tags');
var getRoles=require('./routes/roles');
var session = require('express-session');
var Account= require('./models/account');

var newproject= require('./routes/newproject');
//mongodb://test:<PASSWORD>@testcalypso-shard-00-00-5ciq9.mongodb.net:27017,testcalypso-shard-00-01-5ciq9.mongodb.net:27017,testcalypso-shard-00-02-5ciq9.mongodb.net:27017/test?ssl=true&replicaSet=testcalypso-shard-0&authSource=admin
var db = mongoose.connect('mongodb://localhost:27017/testcal');
//var db = mongoose.connect("mongodb://test:admin@testcalypso-shard-00-00-5ciq9.mongodb.net:27017,testcalypso-shard-00-01-5ciq9.mongodb.net:27017,testcalypso-shard-00-02-5ciq9.mongodb.net:27017/test?ssl=true&replicaSet=testcalypso-shard-0&authSource=admin");

var app = express();

// view engine setup


app.engine('pug', require('pug').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'ssshhhhh',
resave: false,
    saveUninitialized: false}));

app.use(express.static(path.resolve(__dirname, './build')));
app.use('/api/users', users);
app.use('/api/newproject',newproject);  // handling creation of new project
app.use('/api/login', login);
app.use('/api/signup',signup);
app.use('/api/tags',getTags);              // getting all tags from database
app.use('/api/roles',getRoles);            // getting all roles from database
//Pass all other requests to the React server
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './build', 'index.html'));
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
