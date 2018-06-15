var express = require('express');
var router = express.Router();
var Account = require('../models/account');

let standardResponse = {
    success: false,
    reason: "",
    account: ""
};

router.post('/',function(req,res) {
  Account.findByIdAndRemove(req.session.user._id,function(error, account) {
    if (error) {
      standardResponse.reason = "DbError " + error;
    }
    else if (!account) {
      standardResponse.reason = "Account with the id does not exixts";
    }
    else {
      standardResponse.success = true;
      standardResponse.account = account;
    }
    return res.send(standardResponse);
  })
})

module.exports = router;
