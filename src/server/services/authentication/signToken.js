/* @flow */
import jwt from 'jsonwebtoken';
import config from '../../config';

function signToken(user: Object) {
  const roleinfo = user.roles[0].name;
  const payload: AuthToken = {
    issuer: 'boldr',
    subject: user.id,
    algorithms: ['HS256'],
    expiresIn: '7 days',
    email: user.email,
    role: roleinfo,
  };
  return jwt.sign(payload, config.token.secret);
}

export default signToken;
