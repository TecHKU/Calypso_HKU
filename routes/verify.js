var express = require('express');
var router = express.Router();
var Account= require('../models/account');


router.get('/',function(req,res){

  var host=req.get('host');
  console.log(req.protocol+":/"+req.get('host'));
  if((req.protocol+"://"+req.get('host'))==("http://"+host))
  {
      console.log("Domain is matched. Information is from Authentic email");

      Account.findOne({verificationLink:req.query.id},function(error,account){
        if(error) return console.log("error in accessing account database while email verification");
        if(!account) return console.log("No account for this link exists");

        Account.findByIdAndUpdate(account._id,{isVerified:true},function(err,acc){
          if (err) return console.log("error in updating isverified");
          if(!account) return console.log("account doesnt exists");
          console.log("isVerified updated for "+acc.name);
          res.send("account verified");
        })
      })

  }
  else
  {
      res.send("Bad Request wrong protocol");
  }
});

module.exports = router;
