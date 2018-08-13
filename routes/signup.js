var express = require('express');
var router = express.Router();
var Account= require('../models/account');
var sendVerification = require('./sendVerification');

let standardResponse = {
    success: false,
    reason: "",
    isLinkSent:false
    
};

router.post('/',function(req,res){
    console.log(req.body.emailId);
    /*Frontend will handle this
    if (!req.body.emailId|| !req.body.password || !req.body.confirmPassword|| !req.body.password){
        return res.render('signup', { title: "signup" , message: "Please Enter all fields"});
    }
    else if(req.body.password!=req.body.confirmPassword){
        return res.render('signup', { title: "signup" , message: "Password and confirm password doesnt match"});
    }
    */
    //finding username from account database

    Account.findOne({emailId: req.body.emailId}, function(error,account)
    {
        if(account){
          standardResponse.success = false;
          standardResponse.reason = "exists";
          return res.send(standardResponse);
        }
        else if (error){
            standardResponse.success = false;
            standardResponse.reason = "dberror";
            return res.send(standardResponse);
        }

        // creating a new account
        else{
            let rand = Math.floor(Math.random()*90000) + 10000;   // generating a random integer for user verification
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 5; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));
            rand = text.concat(rand.toString());
            Account.create({
                emailId : req.body.emailId,
                password : req.body.password,
                fullName: req.body.fullName,
                isVerified: false,
                verificationLink: rand,
				resetPasswordLink: null, 
                projects:[]
              },function(error,account){
                  if (error){
                    standardResponse.success = false;
                    standardResponse.reason = "dberror "+ error;
                    console.log("Error in adding User to Database" + error);
                    return res.send(standardResponse);
                  }
                  else
                  {
                    standardResponse.success = true;
                    standardResponse.reason = "none";
                    sendVerification(req.get('host'),account.emailId,account.verificationLink, function(isLinkSent, reason){
                      standardResponse.isLinkSent = isLinkSent;
					  standardResponse.reason = reason;
					  console.log('signup mail send', standardResponse);
                      return res.send(standardResponse);
                    });
                  }
            });
        }
    });
});

module.exports = router;
