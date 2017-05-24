/* @flow */
import jwt from 'jsonwebtoken';
import format from 'date-fns/format';
import config from '../../config';

function signToken(user: Object) {
  const roleinfo = user.roles[0].name;
  console.log(
    format(Math.floor(Date.now() / 1000) + 60 * 60 * 24, 'MMM dddd H M a'),
  );
  const payload: AuthToken = {
    issuer: 'boldr',
    subject: user.id,
    algorithms: ['HS256'],
    // iat: Math.floor(Date.now() / 1000),
    // Expires 24hrs from now this is written as the amount of time since
    // the unix epoch ~ 1970
    // exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60 * 24,
    expiresIn: '2 days',
    email: user.email,
    role: roleinfo,
  };
  return jwt.sign(payload, config.token.secret);
}

export default signToken;
