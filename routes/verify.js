var express = require('express');
var router = express.Router();
var Account = require('../models/account');

router.get('/',function(req,res) {
	let standardResponse = {
		success: false,
		reason: "none"
	};
	const host = req.get('host');
	if ((req.protocol + "://" + host) === ("http://" + host)) {
		Account.findOneAndUpdate({verificationLink : req.query.id},{isVerified : true, verificationLink : "" }, (error, account) => {
			if (error) {
				standardResponse.reason = "error in accessing account database " + error;
				return res.send(standardResponse);
			} else if (!account) {
				standardResponse.reason = "No account for this link exists";
				return res.send(standardResponse);
			}
			standardResponse.success = true;
			return res.send(standardResponse);
		})
	} else {
		standardResponse.reason = "Bad request wrong protocol";
		return res.send(standardResponse);
	}
});

module.exports = router;
