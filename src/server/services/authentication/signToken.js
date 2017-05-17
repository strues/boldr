/* @flow */
import jwt from 'jsonwebtoken';
import config from '../../config';

function signToken(user: Object) {
  const roleinfo = user.roles[0].name;
  const payload: AuthToken = {
    iss: 'boldr',
    sub: user.id,
    algorithms: ['HS256'],
    iat: Math.floor(Date.now() / 1000),
    // Expires 24hrs from now this is written as the amount of time since
    // the unix epoch ~ 1970
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    email: user.email,
    role: roleinfo,
  };
  return jwt.sign(payload, config.token.secret);
}

export default signToken;
