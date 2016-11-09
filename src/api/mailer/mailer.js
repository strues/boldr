import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

const debug = require('debug')('boldr:auth:controller');
const config = require('../config/config');

const mailConfig = config.get('mail');

const auth = {
  auth: {
    api_key: mailConfig.mg_api_key,
    domain: mailConfig.domain,
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
    from: mailConfig.from,
    subject: mailSubject,
    html: mailBody,
  };
  if (!user.email || !mailSubject) {
    throw new Error('Incorrect mailing parameters');
  }
  return nodemailerMailgun.sendMail(mailOptions);
}
