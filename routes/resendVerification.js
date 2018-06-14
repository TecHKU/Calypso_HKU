var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var appendQuery = require('append-query');
var sendVerification = require('./sendVerification');

let standardResponse = {
    success: false,
    reason: "none"
};

router.post('/',function (req,res){
  if (req.session.user.isVerified) {
    standardResponse.reason = "Account already verified";
    return res.send(standardResponse);
  }
  sendVerification(req.get('host'),req.session.user.emailId,req.session.user.verificationLink, function(isLinkSent){
    standardResponse.success = isLinkSent;
    return res.send(standardResponse);
  });
});

module.exports = router;
