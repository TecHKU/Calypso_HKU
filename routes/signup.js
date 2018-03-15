var express = require('express');
var router = express.Router();
var Account= require('../models/account');

router.get('/',function(req,res){
  res.render('signup', { title: "signup" });
});


router.post('/',function(req,res){
  console.log(req.body.emailId);
  if (!req.body.emailId|| !req.body.password || !req.body.confirmPassword|| !req.body.password){
    return res.render('signup', { title: "signup" , message: "Please Enter all fields"});
  }
  else if(req.body.password!=req.body.confirmPassword){
    return res.render('signup', { title: "signup" , message: "Password and confirm password doesnt match"});
  }
  //finding username from account database

  Account.findOne({emailId: req.body.emailId}, function(error,account)
  {
    if(account) return res.render('signup', { title: "signup" , message: "emailId Already Exists"});
    else if (error) return console.log("error in accessing the database");
    // creating a new account
    else{
    Account.create({
      emailId : req.body.emailId,
      password : req.body.password,
      fullName: req.body.fullName,
      projects:[]
      },function(error,account){
        if (error) return console.log("Error in adding User to Database");
        else
        {
          res.send(account);
          //console.log(req.body.emailId);
          //res.redirect('/');
        }
        });
    }
  });

});



module.exports = router;
