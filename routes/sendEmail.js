// const emailConfig = require('./email-config')();
const emailConfig = {
  apiKey: process.env.EMAIL_API_KEY,
  domain: process.env.EMAIL_DOMAIN
};
const mailgun = require('mailgun-js')(emailConfig);

const sendEmail = (recipient, message, attachment) =>
	new Promise((resolve, reject) => {
		const data = {
			from: `Calypso <postmaster@${emailConfig.domain}>`,
			to: recipient,
			subject: message.subject,
			text: message.text,
			inline: attachment,
			html: message.html,
		};
		mailgun.messages().send(data, (error) => {
			if (error) {
				console.log('error in mail');
				return reject(error);
			}
			console.log('sent and resolving');
			return resolve();
		});
	});
module.exports = sendEmail;