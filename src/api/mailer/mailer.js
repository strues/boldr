import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import conf from '../config/config';

const debug = require('debug')('boldr:auth:controller');

const auth = {
  auth: {
    api_key: conf.get('mail.key'),
    domain: conf.get('mail.domain'),
  },
};
// Transport is what does the lifting behind the scenes.
const nodemailerMailgun = nodemailer.createTransport(mg(auth));

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
    from: conf.get('mail.from'),
    subject: mailSubject,
    html: mailBody,
  };
  if (!user.email || !mailSubject) {
    throw new Error('Incorrect mailing parameters');
  }
  return nodemailerMailgun.sendMail(mailOptions);
}
