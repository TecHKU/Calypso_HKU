var express = require('express');
var router = express.Router();
var Account = require('../models/account');

let standardResponse = {
    success: false,
    reason: "none"
};

router.get('/',function(req,res){
  var host = req.get('host');
  console.log(req.protocol + ":/" + req.get('host'));
  if((req.protocol + "://" + req.get('host')) == ("http://" + host))
  {
      console.log("Domain is matched. Information is from Authentic email");
      Account.findOneAndUpdate({verificationLink : req.query.id},{isVerified : true, verificationLink : "" },function(error,account){
          if (error) {
            standardResponse.reason = "error in accessing account database " + error;
            return res.send(standardResponse);
          } 
          if (!account) {
            standardResponse.reason = "No account for this link exists";
            return res.send(standardResponse);
          }
          standardResponse.success = true;
          return res.send(standardResponse);
      })
  }
  else
  {
      standardResponse.reason = "Bad request wrong protocol";
      return res.send(standardResponse);
  }
});

module.exports = router;
