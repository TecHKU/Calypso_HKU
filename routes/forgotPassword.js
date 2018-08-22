var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var sendEmail = require('./sendEmail');

function randomToken() {
	let rand = Math.floor(Math.random()*90000) + 10000;   // generating a random integer for user verification
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < 5; i++)
	  text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text.concat(rand.toString());
}

router.post('/',function (req,res) {
	let standardResponse = {
		success: false,
		reason: "none"
	};
	if (!req.body.emailId) {
		standardResponse.reason = "No emailId";
		return res.send(standardResponse);
	}
	const token = randomToken();
	Account.findOneAndUpdate({ emailId: req.body.emailId },{ resetPasswordLink: token }, (error, acc) => {
		if (error) {
			console.log("Cannot add reset password token in DB");
			standardResponse.reason = "Cannot add reset password token in DB";
			return res.send(standardResponse);
		} else if (!acc) {
			console.log("No account with this email id");
			standardResponse.reason = "wrong emailId";
			return res.send(standardResponse);
		}
	});
	const link = `http://${req.get('host')}/resetpass?token=${token}`;
	const message = {
		subject : "Reset your account password",
		html : "Hello,<br> Please Click on the link to change your password.<br><a href=" + link + ">Click here</a>",
		text: "Hello, Please go to the link to change your password: " + link, 
	};
	sendEmail(req.body.emailId, message, null)
		.then(
			() => {
				console.log('resoled and calling callback');
				standardResponse.success = true;
				return res.send(standardResponse);
			}
		).catch(
			(reason) => {
				console.log('Handle rejected promise ('+reason+') here.');
				standardResponse.reason = reason;
				return res.send(standardResponse);
			})
	
});

module.exports = router;
