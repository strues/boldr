/* eslint-disable no-unused-vars */
import uuid from 'node-uuid';
import handleMail from '../../mailer';
import { passwordModifiedEmail, forgotPasswordEmail } from '../../mailer/templates';
import User from '../user/user.model';
import { responseHandler, generateHash } from '../../core';
import Token from './token.model';

/**
 * forgottenPassword takes an email address, generates a reset token, updates the user in the database, then sends
 * an email with the token to reset the user password.
 * @param req
 * @param res
 * @returns {*}
 */
export async function forgottenPassword(req, res, next) {
  const user = await User.query().where({ email: req.body.email }).first();
  if (!user) {
    return res.status(404).json({ error: 'Unable to locate an user with the provided email.' });
  }
  const mailSubject = '[Boldr] Password Reset';
  const verificationToken = generateHash();

  await user.$relatedQuery('tokens').insert({
    reset_password_token: verificationToken,
    user_id: user.id,
  });
  const mailBody = forgotPasswordEmail(verificationToken);

  await handleMail(user, mailBody, mailSubject);
  return responseHandler(null, res, 202, { message: 'Sending email with reset link' });
}

/**
 * resetPassword takes the user's reset_password_token, and a new password, hashes it and updates the password
 * @param req
 * @param res
 * @returns {*}
 */
export async function resetPassword(req, res, next) {
  const findToken = await Token.query().where({ reset_password_token: req.body.token }).first();
  if (!findToken) {
    return res.status(404).json({ error: 'Unable to locate an user with the provided token.' });
  }
  const mailSubject = '[Boldr] Password Changed';

  const user = await User.query().findById(findToken.user_id);
  await User.query().patchAndFetchById(user.id, {
    password: req.body.password,
  });
  const mailBody = await passwordModifiedEmail(user);
  handleMail(user, mailBody, mailSubject);
  return res.status(200).json('Sent');
}
