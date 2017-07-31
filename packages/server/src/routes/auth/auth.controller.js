import User from '../../models/User';
import VerificationToken from '../../models/VerificationToken';

const debug = require('debug')('boldr:auth-ctrl');

export async function verifyUserRegister(req, res, next) {
  try {
    const token = req.body.token;

    if (!token) {
      return next(new BadRequest('Invalid account verification code'));
    }

    const userToken = await VerificationToken.query().where({ token: req.body.token }).first();

    if (userToken.used === true) {
      return res.status(401).json('This token has already been used.');
    }
    const user = await User.query().patchAndFetchById(userToken.userId, {
      verified: true,
    });

    VerificationToken.query().where({ token: req.body.token }).update({ used: true });

    return res.status(201).send(user);
  } catch (err) {
    return next(new Error(err));
  }
}
export async function checkAuthentication(req, res, next) {
  try {
    const validUser = await User.query().findById(req.user.id).eager('[roles,socialMedia]');

    if (!validUser) {
      return res.status(401).json('Unauthorized: Please login again.');
    }
    validUser.stripPassword();
    return res.status(200).send(validUser);
  } catch (error) {
    return next(new Error(error));
  }
}
