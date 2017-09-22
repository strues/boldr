/* eslint-disable no-unused-vars, camelcase */
import uuid from 'uuid';
import addDays from 'date-fns/add_days';
import { mailer } from '../../services';
import { passwordModifiedEmail, forgotPasswordEmail } from '../../services/mailer/templates';
import Account from '../../models/Account';

/**
 * forgottenPassword takes an email address, generates a reset token, updates the user in the database, then sends
 * an email with the token to reset the user password.
 * @param req
 * @param res
 * @returns {*}
 */
export async function forgottenPassword(req, res, next) {
  const account = await Account.query()
    .where({ email: req.body.email })
    .first();
  if (!account) {
    throw new Error('unable to find account');
  }
  const mailSubject = '[Boldr] Password Reset';
  const resetPasswordToken = uuid.v4();
  await Account.query().patchAndFetchById(account.id, {
    reset_token: resetPasswordToken,
    reset_token_exp: addDays(new Date(), 1),
  });

  const mailBody = forgotPasswordEmail(resetPasswordToken);

  mailer(account, mailBody, mailSubject);
  return res.status(202).json({
    message: 'Sending email with reset link',
  });
}

/**
 * resetPassword takes the user's reset_password_token, and a new password,
 * hashes it and updates the password
 * @param req
 * @param res
 * @returns {*}
 */
export async function resetPassword(req, res, next) {
  try {
    const account = await Account.query()
      .where({ reset_token: req.body.token })
      .first();

    if (!account) {
      return res.status(404).json({ error: 'Unable to locate an user with the provided token.' });
    }
    const mailSubject = '[Boldr] Password Changed';

    const user = await Account.query().patchAndFetchById(account.id, {
      password: req.body.password,
    });

    const mailBody = passwordModifiedEmail(user);
    await mailer(user, mailBody, mailSubject);
    return res.status(204).send('Sent');
  } catch (error) {
    return next(new Error(error));
  }
}
