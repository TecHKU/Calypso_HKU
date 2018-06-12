var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var appendQuery = require('append-query');

let standardResponse = {
    success: false,
    reason: "none"
};

router.get('/',function (req,res){
  Account.find({ _id:req.session.user._id},function(error,account){
    if (!account){
      standardResponse.success = false;
      standardResponse.reason = "user id does not existss "+ req.session.user._id;
      return res.send(standardResponse);
    }
    else if (error){
      standardResponse.reason = "Database accessing error:"+ error;
      return res.send(standardResponse);
    }
    else{
      standardResponse.success = true;
      if (account.isVerified){
        standardResponse.reason = "account is already verified";
        return res.send(standardResponse);
      }
      account = account[0];     // Account.find() returns an array of accounts
      res.redirect(appendQuery('/api/sendVerification', {verificationLink:account.verificationLink,emailId:account.emailId,standardResponse:standardResponse}));
    }
  })
});

module.exports = router;
