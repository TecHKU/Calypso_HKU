const emailConfig = require('./email-config')();
const mailgun = require('mailgun-js')(emailConfig);

const sendEmail = (recipient, message, attachment) =>
  new Promise((resolve, reject) => {
    const data = {
      from: 'test <postmaster@sandbox5a8e42a582f844c4a85cb3d6563e7c4c.mailgun.org>',
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

function sendLink(host, emailId, verificationLink, callback) {
  var link = "http://" + host + "/api/verify?id=" + verificationLink;
  console.log(link + " this is the new link to be emailed");
  console.log(emailId + " this is ths email id ");
  var message = {
	  subject : "CALYPSO: Please confirm your Email account for Calypso",
	  html : "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>",
	  text: "text"
  };
  sendEmail(emailId, message, null).then(
	 function() {
		 console.log('resoled and calling callback');
		 callback(true, null);
	  }).catch(
	 (reason) => {
		  console.log('Handle rejected promise ('+reason+') here.');
		  callback(false, reason);
	  })
}


module.exports = sendLink;
