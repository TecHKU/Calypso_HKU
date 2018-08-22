const sendEmail = require('./sendEmail');

function sendLink(host, emailId, verificationLink, callback) {
	let link = "http://" + host + "/verification?id=" + verificationLink;
	let message = {
		subject : "Email address confirmation for your new account",
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
