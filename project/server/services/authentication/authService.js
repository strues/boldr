import jwt from 'jsonwebtoken';
import _debug from 'debug';
import config from '@boldr/config';
import Account from '../../models/Account';

const debug = _debug('boldr:server:service:authentication');
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
  req.isAuthenticated = () => {
    const token = fromHeaderOrQuerystring(req);
    try {
      return jwt.verify(token, config.get('token.secret'));
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      return false;
    }
  };
  if (req.isAuthenticated()) {
    const payload = req.isAuthenticated();
    debug('req.isAuthenticated()', payload);
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
