var express = require('express');
var router = express.Router();
var Account= require('../models/account');


router.get('/',function(req,res){
  res.render('login', { title: "login" });
});


router.post('/',function(req,res){
  if (!req.body.emailId || !req.body.password){

    return res.render('login', { title: "login" , message: "Please Enter both emailId and password"});
  }
  //finding username from account database
  Account.findOne({emailId: req.body.emailId},function(error,account)
  {
    if (error)
      return console.log("Error in accessing database");

    if (!account)
      return res.render('login', { title: "login" , message: "emailId doesnot Exists"});
    // creating a new session

    if (account.compare(req.body.password)){
      req.session.user = account;
      req.session.save();
      console.log("session started");

      //console.log(req.session.user.username);
      //console.log(req.session);
      //res.render('index',{title:"home",posts:"posts"});
      res.redirect('/');
    }

    else return res.render('login', { title: "login" , message: "Wrong password"});
  });
});

module.exports = router;
