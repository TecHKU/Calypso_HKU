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

/*
router.get('/',function(req,res){
  res.render('login', { title: "login" });
});
*/


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
        standardResponse.status = "incomplete";
        standardResponse.exists = false;
        standardResponse.verified = false;
        standardResponse.loginSuccess = false;
        console.log("Error in accessing database. "+ error);
        return res.send(standardResponse);

    }

    if (!account)
    {
        standardResponse.status = "complete";
        standardResponse.exists = false;
        standardResponse.verified = false;
        standardResponse.loginSuccess = false;
        return res.send(standardResponse);
    }

    // creating a new session
    if (account.compare(req.body.password)){
      account["password"]="";
      req.session.user = account;
      req.session.save();
      console.log("");
      if(!account.isVerified)
      {
          standardResponse.status = "complete";
          standardResponse.exists = true;
          standardResponse.verified = false;
          standardResponse.loginSuccess = true;
      }
      else
      {
          standardResponse.status = "complete";
          standardResponse.exists = true;
          standardResponse.verified = true;
          standardResponse.loginSuccess = true;
      }

      standardResponse.session = account;
      console.log(req.session);
      res.send(standardResponse);
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
