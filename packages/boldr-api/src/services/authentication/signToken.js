import jwt from 'jsonwebtoken';
import config from '../../config';

function signToken(user) {
  const roleinfo = user.roles[0].name;
  const timestamp = new Date().getTime();
  const payload = {
    sub: user.id,
    iat: timestamp,
    expiresIn: 60 * 60 * 24,
    email: user.email,
    role: roleinfo,
  };
  return jwt.sign(payload, config.token.secret);
}

export default signToken;
