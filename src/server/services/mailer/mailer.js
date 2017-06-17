import { createTransport } from 'nodemailer';
import config from '../../config';

const debug = require('debug')('boldr:mailer');

const TRANSPORT_OPTS = {
  host: config.mail.host,
  port: config.mail.port,
  secure: config.mail.ssl,
  auth: {
    user: config.mail.user,
    pass: config.mail.password,
  },
};

export const transporter = createTransport(TRANSPORT_OPTS);
/**
 * enables sending emails
 * @method mailer
 * @param  {Object}      user        the user / account we want to send mail to
 * @param  {Object}      mailBody    the contents of the email. Can be a
 * template, raw html, or just text
 * @param  {String}      mailSubject the subject line
 * @return {Promise}                  promise that the email is being sent
 */
export default (async function mailer(user, mailBody, mailSubject) {
  const mailOptions = {
    to: user.email,
    from: config.mail.from,
    subject: mailSubject,
    html: mailBody,
  };
  if (!user.email || !mailSubject) {
    throw new Error('Incorrect mailing parameters');
  }
  try {
    const info = await transporter.sendMail(mailOptions);
    debug(`Message sent: ${info.response}`);
  } catch (error) {
    return debug(error);
  }
});
