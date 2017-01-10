'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordModifiedEmail = exports.forgotPasswordEmail = exports.welcomeEmail = undefined;

var _api = require('../../../config/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var welcomeEmail = function welcomeEmail(verificationToken) {
  return '\n    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"     http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n    <html xmlns="http://www.w3.org/1999/xhtml">\n      <body>\n        <div style=\'margin: 0; padding: 0; width: 100%; font-family: Trebuchet MS, sans-serif;\'>\n        <div style=\'background-color: #f2f2f2; padding: 45px;\'>\n        <div style=\'background-color: #ffffff; padding: 40px; text-align: center;\'>\n        <p style=\'color: #5f5f5f;\'>Click the big button below to activate your account.</p>\n        <a href="http://' + _api2.default.mail.domain + '/account/verify/' + verificationToken + '"\n        style=\'background-color: #288feb; color: #fff;\n        padding: 14px; text-decoration: none; border-radius: 5px;\n        margin-top: 20px; display: inline-block;\'>Activate Account</a>\n        </div> <h3 style=\'color: #5f5f5f; text-align: center; margin-top: 30px;\'>BoldrCMS Team</h3></div></div>\n      </body>\n    </html>\n  ';
};

var forgotPasswordEmail = function forgotPasswordEmail(verificationToken) {
  return '\n    <div style=\'margin: 0; padding: 0; width: 100%; font-family: Trebuchet MS, sans-serif;\'>\n    <div style=\'background-color: #f2f2f2; padding: 45px;\'>\n    <div style=\'background-color: #ffffff; padding: 40px; text-align: center;\'>\n    <p style=\'color: #5f5f5f;\'>Click the big button below to finish resetting your password.</p>\n    <a href="' + _api2.default.mail.domain + '/account/reset-password/' + verificationToken + '"\n    style=\'background-color: #288feb; color: #fff;\n    padding: 14px; text-decoration: none; border-radius: 5px;\n    margin-top: 20px; display: inline-block;\'>Reset password</a>\n    </div> <h3 style=\'color: #5f5f5f; text-align: center; margin-top: 30px;\'>BoldrCMS Team</h3></div></div>\n  ';
};

var passwordModifiedEmail = function passwordModifiedEmail(user) {
  return '\n    <div style=\'margin: 0; padding: 0; width: 100%; font-family: Trebuchet MS, sans-serif;\'>\n    <div style=\'background-color: #f2f2f2; padding: 45px;\'>\n    <div style=\'background-color: #ffffff; padding: 40px; text-align: center;\'>\n    <p style=\'color: #5f5f5f;\'>Click the big button below to activate your account.</p>\n    style=\'background-color: #288feb; color: #fff;\n    padding: 14px; text-decoration: none; border-radius: 5px;\n    margin-top: 20px; display: inline-block;\'>Activate Account</a>\n    </div> <h3 style=\'color: #5f5f5f; text-align: center; margin-top: 30px;\'>BoldrCMS Team</h3></div></div>\n  ';
};

exports.welcomeEmail = welcomeEmail;
exports.forgotPasswordEmail = forgotPasswordEmail;
exports.passwordModifiedEmail = passwordModifiedEmail;