import { createTransport } from 'nodemailer';

const debug = require('debug')('boldr:mailer');
const config = require('../config/config');

const mailConfig = config.get('mail');

const TRANSPORT_OPTS = {
  host: mailConfig.host,
    port: 465,
    secure: true, // use SSL
    auth: {
        user: mailConfig.user,
        pass: mailConfig.password,
    }
}

const transporter = createTransport(TRANSPORT_OPTS);
/**
 * enables sending emails
 * @method handleMail
 * @param  {Object}      user        the user / account we want to send mail to
 * @param  {Object}      mailBody    the contents of the email. Can be a template, raw html, or just text
 * @param  {String}      mailSubject the subject line
 * @return {Promise}                  promise that the email is being sent
 */
export default function handleMail(user, mailBody, mailSubject) {
  const mailOptions = {
    to: user.email,
    from: mailConfig.from,
    subject: mailSubject,
    html: mailBody,
  };
  if (!user.email || !mailSubject) {
    throw new Error('Incorrect mailing parameters');
  }
  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return debug(error);
    }
   debug('Message sent: ' + info.response);
  });
}
