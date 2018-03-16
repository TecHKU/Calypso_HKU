var express = require('express');
var router = express.Router();
var Account= require('../models/account');

let standardResponse = {
    "status": "incomplete",
    "exists": false,
    "verified": false,
    "loginSuccess": false,
    "session": null
};

router.get('/',function(req,res){
  res.render('login', { title: "login" });
});


router.post('/',function(req,res){
  if (!req.body.emailId || !req.body.password){
    standardResponse.status = "incomplete";
    standardResponse.exists = false;
    standardResponse.verified = false;
    standardResponse.loginSuccess = false;
    return res.send(standardResponse);
  }

  //finding username from account database
  Account.findOne({emailId: req.body.emailId},function(error,account)
  {
    if (error){
        return console.log("Error in accessing database. "+ error);
    }

    if (!account){
        standardResponse.status = "complete";
        standardResponse.exists = false;
        standardResponse.verified = false;
        standardResponse.loginSuccess = false;
        return res.send(standardResponse);
    }

    // creating a new session
    if (account.compare(req.body.password)){
      req.session.user = account;
      req.session.save();
      console.log("");
        if(!account.isVerified){
            standardResponse.status = "incomplete";
            standardResponse.exists = true;
            standardResponse.verified = false;
            standardResponse.loginSuccess = true;
        }
        standardResponse.session = account;

      //console.log(req.session.user.username);
      console.log(req.session);
      //res.render('index',{title:"home",posts:"posts"});
      res.send(standardResponse);
      //res.redirect('/');
    }

    else{
        standardResponse.status = "complete";
        standardResponse.exists = false;
        standardResponse.verified = false;
        standardResponse.loginSuccess = false;
        res.send(standardResponse);
    }
  });
});

module.exports = router;
