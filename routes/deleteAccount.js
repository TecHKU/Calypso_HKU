var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var Project= require('../models/project');


router.post('/',function(req,res) {
  let standardResponse = {
      success: false,
      reason: "",
      account: ""
  };
  Account.findByIdAndRemove(req.session.user._id,function(error, account) {
    if (error) {
      standardResponse.reason = "DbError " + error;
      return res.send(standardResponse);
    }
    else if (!account) {
      standardResponse.reason = "Account with the id does not exixts";
      return res.send(standardResponse);
    }
    else {
      standardResponse.success = true;
      standardResponse.account = account;
      Project.deleteMany({author:req.session.user._id}, function(err,obj){
        if(error){
          standardResponse.reason = "Account deleted but projects could not be deleted";
        }
        return res.send(standardResponse);     
      })
    }

  })
})

module.exports = router;
