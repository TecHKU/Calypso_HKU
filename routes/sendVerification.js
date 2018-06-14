
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "techku.calypso@gmail.com",
        pass: "techku2018"
    }
});

function sendLink(host, emailId, verificationLink, callback) {
  var link = "http://" + host + "/api/verify?id=" + verificationLink;
  console.log(link + " this is the new link to be emailed");
  console.log(emailId + " this is ths email id ");
  var mailOptions = {
      to : emailId,
      subject : "Please confirm your Email account",
      html : "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
   if(error)
   {
      console.log(error);
      callback(false);
   }
   else
   {
      console.log("Message sent: " + response.message);
      callback(true);
    }
  });
}


/*
router.get('/',function(req,res){
    console.log("get request to send verification request");
    var host = req.get('host');
    var link = "http://" + host + "/api/verify?id=" + req.query.verificationLink;
    console.log(link + " this is the new link to be emailed");
    console.log(req.query.emailId + " this is ths email id ");
    var mailOptions = {
        to : req.query.emailId,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error)
     {
            console.log(error);
            standardResponse.success = false;
            standardResponse.reason = "verification email sending error";
            res.send(standardResponse);
     }
     else
     {
        console.log("Message sent: " + response.message);
        standardResponse.success = true;
        res.send(standardResponse);
      }
    });
});
*/
module.exports = sendLink;
