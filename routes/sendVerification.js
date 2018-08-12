const sendEmail = require('./sendEmail');

function sendLink(host, emailId, verificationLink, callback) {
	var link = "http://" + host + "/api/verify?id=" + verificationLink;

	var message = {
		subject : "CALYPSO: Please confirm your Email account for Calypso",
		html : "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>",
		text: "text"
	};
	sendEmail(emailId, message, null)
		.then(() => {
			console.log('resoled and calling callback');
			callback(true, null);
		}).catch((reason) => {
			console.log('Handle rejected promise ('+reason+') here.');
			callback(false, reason);
		})
}

module.exports = sendLink;
