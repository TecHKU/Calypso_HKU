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
//var login=require('./routes/login');
var signup=require('./routes/signup');
var session = require('express-session');
var Account= require('./models/account');

var newproject= require('./routes/newproject');
var db = mongoose.connect('mongodb://localhost:27017/calpy');
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
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'ssshhhhh',
resave: false,
    saveUninitialized: false}));

app.use('/', index);
app.use('/users', users);
app.use('/newproject',newproject);  // handling creation of new project

app.use('/signup',signup);


app.listen(3000, function(){
	console.log("Server running on 3000...");
})


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.get('/login',function(req,res){
  res.render('login', { title: "login" });
});


app.post('/login',function(req,res){
  /*if (!req.body.fullName || !req.body.password){

    return res.render('login', { title: "login" , message: "Please Enter both username and password"});
  }*/
  //finding username from account database
  
  Account.findOne({fullName: req.body.fullName},function(error,account)
  { 
    if (error) 
      {return console.log("Error");}

    if (!account)
      {return res.render('login', { title: "login" , message: "fullName doesnot Exists"});}
    // creating a new session
    if(account)
    {
    	console.log(account);
    }

    
    if (account.compare(req.body.password)){

      req.session.user = account;
      req.session.save();
      console.log("session started");

      //console.log(req.session.user.username);
      //console.log(req.session);
      //res.render('index',{title:"home",posts:"posts"});
      res.redirect('/');
    }

    else {return res.render('login', { title: "login" , message: "Wrong password"});}
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
