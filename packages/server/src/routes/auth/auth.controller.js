import Account from '../../models/Account';

export async function verifyUserRegister(req, res, next) {
  try {
    const token = req.body.token;

    if (!token) {
      return next(new BadRequest('Invalid account verification code'));
    }

    const account = await Account.query()
      .where({ verificationToken: req.body.token })
      .first();
    if (!account) {
      return next(new BadRequest('Invalid account verification code'));
    }
    const user = await Account.query().patchAndFetchById(account.id, {
      verified: true,
      verificationToken: null,
    });

    return res.status(201).send(user);
  } catch (err) {
    return next(new Error(err));
  }
}
export async function checkAuthentication(req, res) {
  const validUser = await Account.query()
    .findById(req.session.user.id)
    .eager('[roles,profile]');

  if (!validUser) {
    return res.status(401).json('Unauthorized: Please login again.');
  }
  validUser.stripPassword();
  return res.status(200).send(validUser);
}
