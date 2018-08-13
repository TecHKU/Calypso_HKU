var express = require('express');
var router = express.Router();
var sendVerification = require('./sendVerification');

let standardResponse = {
    success: false,
    reason: "none"
};

router.get('/',function (req,res){
  if (req.session.user.isVerified) {
    standardResponse.reason = "Account already verified";
    return res.send(standardResponse);
  }
  sendVerification(req.get('host'),req.session.user.emailId,req.session.user.verificationLink, function(isLinkSent, reason){
    standardResponse.success = isLinkSent;
	standardResponse.reason = reason;
    return res.send(standardResponse);
  });
});

module.exports = router;
