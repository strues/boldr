import jwt from 'jsonwebtoken';
import { config } from '@boldr/config';
import Account from '../../models/Account';

/**
 * Extracts a JWT from a request header or query string
 * @param  {Object} req the request object
 * @return {string}     the token
 */
function fromHeaderOrQuerystring(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

export default async (req, res, next) => {
  req.isAuthenticated = async () => {
    const token = fromHeaderOrQuerystring(req);
    if (!token) {
      return false;
    }
    try {
      await jwt.verify(token, config.get('token.secret'));
      return true;
    } catch (err) {
      return false;
    }
  };
  if (req.isAuthenticated()) {
    const payload = req.isAuthenticated();
    const account = await Account.query()
      .findById(payload.subject)
      .eager('[roles,profile]')
      .skipUndefined();
    req.session.user = account;
    req.user = account;
    req.user.role = account.roles[0].name;

    return next();
  } else {
    return next();
  }
};
