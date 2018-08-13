var express = require('express');
var router = express.Router();
var Account = require('../models/account');

router.post('/', (req, res) => {
	let standardResponse = {
		success: false,
		reason: "none"
	};
	if (!req.body.token || !req.body.password) {
		standardResponse.reason = "No token or password in the request body";
		return res.send(standardResponse);
	}
	Account.findOne({resetPasswordLink: req.body.token}, (error, account) => {
		if (error) {
			console.log("error in adding the new password");
			standardResponse.reason = "Cannot add new password in DB";
			return res.send(standardResponse);
		} else if (!account) {
			console.log("no account with such reset password token exists");
			standardResponse.reason = "wrong token";
			return res.send(standardResponse);	
		}
		account.password = req.body.password;
		account.resetPasswordLink = null;
		account.save((error) => {
			if (error) {
				standardResponse.reason = "Database adding error: "+ error;
			} else {
				standardResponse.success = true;
			}
			return res.send(standardResponse);
		})
	});
})

module.exports = router;
