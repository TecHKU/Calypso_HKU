const emailConfig = require('./email-config')();
const mailgun = require('mailgun-js')(emailConfig);

const sendEmail = (recipient, message, attachment) =>
  new Promise((resolve, reject) => {
    const data = {
      from: 'Calypso <postmaster@sandbox6e3231a8b9b441419774a8fb264f98c8.mailgun.org>',
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