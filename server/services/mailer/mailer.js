import { createTransport } from 'nodemailer';
import getConfig from '../../../config/get';

const debug = require('debug')('boldrAPI:mailer');


const TRANSPORT_OPTS = {
  host: getConfig('mail.host'),
  port: getConfig('mail.port'),
  secure: getConfig('mail.ssl'), // use SSL
  auth: {
    user: getConfig('mail.user'),
    pass: getConfig('mail.password'),
  },
};

export const transporter = createTransport(TRANSPORT_OPTS);
/**
 * enables sending emails
 * @method mailer
 * @param  {Object}      user        the user / account we want to send mail to
 * @param  {Object}      mailBody    the contents of the email. Can be a template, raw html, or just text
 * @param  {String}      mailSubject the subject line
 * @return {Promise}                  promise that the email is being sent
 */
export default function mailer(user, mailBody, mailSubject) {
  const mailOptions = {
    to: user.email,
    from: getConfig('mail.from'),
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
    debug(`Message sent: ${info.response}`);
  });
}
