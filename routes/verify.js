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
      Account.findOne({verificationLink : req.query.id},function(error, account){
        if(error){
          standardResponse.reason = "error in accessing account database while findinf account";
          return res.send(standardResponse);
        }
        if(!account){
          standardResponse.reason = "No account for this link exists";
          return res.send(standardResponse);
        }
        account.isVerified = true;
        account.verificationLink = "";
        account.save(function(error){
          if(error){
            standardResponse.reason = "error while accessing database to update verification status";
            return res.send(standardResponse);
          }
          else {
            standardResponse.success = true;
            return res.send(standardResponse);
          }
        })
      })
  }
  else
  {
      standardResponse.reason = "Bad Request wrong protocol";
      return res.send(standardResponse);
  }
});

module.exports = router;
