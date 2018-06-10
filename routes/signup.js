var express = require('express');
var router = express.Router();
var Account= require('../models/account');
var appendQuery = require('append-query');


let standardResponse = {
    success: false,
    reason: ""
};

router.get('/',function(req,res){
//  res.render('signup', { title: "signup" });
});


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
          res.send(standardResponse);
        }
        else if (error){
            standardResponse.success = false;
            standardResponse.reason = "dberror";
          res.send(standardResponse);
        }

        // creating a new account
        else{
            let rand=Math.floor(Math.random()*90000) + 10000;   // generating a random integer for user verification
            Account.create({
                emailId : req.body.emailId,
                password : req.body.password,
                fullName: req.body.fullName,
                isVerified: false,
                verificationLink:rand,
                projects:[]
              },function(error,account){
                  if (error){
                    standardResponse.success = false;
                    standardResponse.reason = "dberror";
                    res.send(standardResponse);
                    console.log("Error in adding User to Database");
                  }
                  else
                  {
                      standardResponse.success = true;
                      standardResponse.reason = "none";
                      res.send(standardResponse);
                      //res.redirect(appendQuery('/api/sendVerification', {random:rand,emailId:account.emailId}));
                      //console.log(req.body.emailId);
                  }
            });
        }
    });
});




module.exports = router;
