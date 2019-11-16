const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const mongoose = require('mongoose');

//var index = require('./routes/index');
//var users = require('./routes/users');
const login = require('./routes/login');
const signup = require('./routes/signup');
const logout = require('./routes/logout');
const getTags = require('./routes/tags');
const getRoles = require('./routes/roles');
const sendVerification = require('./routes/sendVerification');
const verify = require('./routes/verify');
const sessionDetail = require('./routes/sessionDetail');
const getProjects = require('./routes/projects');
const getCurrentUserProjects = require('./routes/currentUserProjects');
const session = require('express-session');
const Account = require('./models/account');
const resendVerification = require('./routes/resendVerification');
const deleteAccount = require('./routes/deleteAccount');
const deleteProject = require('./routes/deleteProject');
const forgotPassword = require('./routes/forgotPassword');
const resetPassword = require('./routes/resetPassword');
const imageUpload = require('./routes/s3Sign');
const editProject = require('./routes/editProject');

const newproject = require('./routes/newproject');
const hitCount = require('./routes/hitCounter');
//mongodb://test:<PASSWORD>@testcalypso-shard-00-00-5ciq9.mongodb.net:27017,testcalypso-shard-00-01-5ciq9.mongodb.net:27017,testcalypso-shard-00-02-5ciq9.mongodb.net:27017/test?ssl=true&replicaSet=testcalypso-shard-0&authSource=admin
//var db = mongoose.connect('mongodb://localhost:27017/testcal');
const db = mongoose.connect("mongodb://test:admin@testcalypso-shard-00-00-5ciq9.mongodb.net:27017,testcalypso-shard-00-01-5ciq9.mongodb.net:27017,testcalypso-shard-00-02-5ciq9.mongodb.net:27017/test?ssl=true&replicaSet=testcalypso-shard-0&authSource=admin");

const app = express();

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
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
