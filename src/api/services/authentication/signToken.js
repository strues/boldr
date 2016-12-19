import jwt from 'jsonwebtoken';
import { token } from 'config/index';

function signToken(user) {
  // const roleinfo = account.role[0];
  const timestamp = new Date().getTime();
  const payload = {
    sub: user.id,
    iat: timestamp,
    expiresIn: 60 * 60 * 24,
    email: user.email,
    role: user.role.id,
  };
  return jwt.sign(payload, token.secret);
}

export default signToken;
