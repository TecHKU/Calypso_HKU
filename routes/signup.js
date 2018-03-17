var express = require('express');
var router = express.Router();
var Account= require('../models/account');
var appendQuery = require('append-query');


let standardRespoonse = {
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
          standardRespoonse.success = false;
          standardRespoonse.reason = "exists";
          res.send(standardRespoonse);
        }
        else if (error){
            standardRespoonse.success = false;
            standardRespoonse.reason = "dberror";
          res.send(standardRespoonse);
        }

        // creating a new account
        else{
            let rand=Math.floor(Math.random()*90000) + 10000;
            Account.create({
                emailId : req.body.emailId,
                password : req.body.password,
                fullName: req.body.fullName,
                isVerified: false,
                verificationLink:rand,
                projects:[]
            },function(error,account){
                if (error){
                  return console.log("Error in adding User to Database");
                }
                else
                {
                    standardRespoonse.success = true;
                    standardRespoonse.reason = "none";
                    res.send(standardRespoonse);
                    //res.send(account);
                    //res.redirect(appendQuery('/api/sendVerification', {random:rand,emailId:account.emailId}));
                    //console.log(req.body.emailId);
                    //res.redirect('/');
                }
            });
        }
    });
});




module.exports = router;
