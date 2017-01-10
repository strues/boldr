'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transporter = undefined;
exports.default = mailer;

var _nodemailer = require('nodemailer');

var _api = require('../../../config/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')('boldrAPI:mailer');

var TRANSPORT_OPTS = {
  host: _api2.default.mail.host,
  port: _api2.default.mail.port,
  secure: _api2.default.mail.ssl, // use SSL
  auth: {
    user: _api2.default.mail.user,
    pass: _api2.default.mail.password
  }
};

var transporter = exports.transporter = (0, _nodemailer.createTransport)(TRANSPORT_OPTS);
/**
 * enables sending emails
 * @method mailer
 * @param  {Object}      user        the user / account we want to send mail to
 * @param  {Object}      mailBody    the contents of the email. Can be a template, raw html, or just text
 * @param  {String}      mailSubject the subject line
 * @return {Promise}                  promise that the email is being sent
 */
function mailer(user, mailBody, mailSubject) {
  var mailOptions = {
    to: user.email,
    from: _api2.default.mail.from,
    subject: mailSubject,
    html: mailBody
  };
  if (!user.email || !mailSubject) {
    throw new Error('Incorrect mailing parameters');
  }
  return transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return debug(error);
    }
    debug('Message sent: ' + info.response);
  });
}