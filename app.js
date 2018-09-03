var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');

//var index = require('./routes/index');
//var users = require('./routes/users');
var login = require('./routes/login');
var signup = require('./routes/signup');
var logout = require('./routes/logout');
var getTags = require('./routes/tags');
var getRoles = require('./routes/roles');
var sendVerification = require('./routes/sendVerification');
var verify = require('./routes/verify');
var sessionDetail = require('./routes/sessionDetail');
var getProjects = require('./routes/projects');
var getCurrentUserProjects = require('./routes/currentUserProjects');
var session = require('express-session');
var Account = require('./models/account');
var resendVerification = require('./routes/resendVerification');
var deleteAccount = require('./routes/deleteAccount');
var deleteProject = require('./routes/deleteProject');
var forgotPassword = require('./routes/forgotPassword');
var resetPassword = require('./routes/resetPassword');
var imageUpload = require('./routes/s3Sign');
var editProject = require('./routes/editProject');

var newproject = require('./routes/newproject');
var hitCount = require('./routes/hitCounter');
//mongodb://test:<PASSWORD>@testcalypso-shard-00-00-5ciq9.mongodb.net:27017,testcalypso-shard-00-01-5ciq9.mongodb.net:27017,testcalypso-shard-00-02-5ciq9.mongodb.net:27017/test?ssl=true&replicaSet=testcalypso-shard-0&authSource=admin
//var db = mongoose.connect('mongodb://localhost:27017/testcal');
var db = mongoose.connect("mongodb://test:admin@testcalypso-shard-00-00-5ciq9.mongodb.net:27017,testcalypso-shard-00-01-5ciq9.mongodb.net:27017,testcalypso-shard-00-02-5ciq9.mongodb.net:27017/test?ssl=true&replicaSet=testcalypso-shard-0&authSource=admin");

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'ssshhhhh',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.resolve(__dirname, './dist')));

// All the routings
app.use('/api/newproject', newproject);  // handling creation of new project
app.use('/api/login', login);
app.use('/api/signup', signup);
app.use('/api/logout', logout);
app.use('/api/tags', getTags);              // getting all tags from database
app.use('/api/roles', getRoles);
app.use('/api/sendVerification', sendVerification);
app.use('/api/verify', verify);      // getting all roles from database
app.use('/api/sessionDetail', sessionDetail);
app.use('/api/projects', getProjects);
app.use('/api/currentUserProjects', getCurrentUserProjects);
app.use('/api/hitCounter', hitCount);
app.use('/api/resendVerification', resendVerification);
app.use('/api/deleteAccount', deleteAccount);
app.use('/api/deleteProject', deleteProject);
app.use('/api/forgotPassword', forgotPassword);
app.use('/api/resetPassword', resetPassword);
app.use('/api/imageUpload', imageUpload);
app.use('/api/editProject', editProject);


//Pass all other requests to the React server
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, './dist', 'index.html'));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
