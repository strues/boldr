/* eslint-disable no-unused-vars */
import uuid from 'uuid';
import { mailer, generateHash } from '../../services';
import { passwordModifiedEmail, forgotPasswordEmail } from '../../services/mailer/templates';
import User from '../../models/User';
import VerificationToken from '../../models/VerificationToken';
import ResetToken from '../../models/ResetToken';
/**
 * forgottenPassword takes an email address, generates a reset token, updates the user in the database, then sends
 * an email with the token to reset the user password.
 * @param req
 * @param res
 * @returns {*}
 */
export async function forgottenPassword(req, res, next) {
  const user = await User.query().where({ email: req.body.email }).first();
  const mailSubject = '[Boldr] Password Reset';
  const resetPasswordToken = uuid.v4();

  await user.$relatedQuery('resetToken').insert({
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    token: resetPasswordToken,
    userId: user.id,
  });

  const mailBody = forgotPasswordEmail(resetPasswordToken);

  mailer(user, mailBody, mailSubject);
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
    const userResetToken = await ResetToken.query().where({ token: req.body.token }).first();

    if (!userResetToken) {
      return res.status(404).json({ error: 'Unable to locate an user with the provided token.' });
    }
    const mailSubject = '[Boldr] Password Changed';

    const user = await User.query().findById(userResetToken.userId);

    User.query().patchAndFetchById(user.id, {
      password: req.body.password,
    });
    const mailBody = passwordModifiedEmail(user);
    await mailer(user, mailBody, mailSubject);
    return res.status(204).send('Sent');
  } catch (error) {
    return next(new Error(error));
  }
}
