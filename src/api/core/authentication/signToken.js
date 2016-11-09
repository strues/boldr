import jwt from 'jsonwebtoken';

const config = require('../../config/config');

const sessionConfig = config.get('session');

function signToken(user) {
  // const roleinfo = account.role[0];
  const timestamp = new Date().getTime();
  const payload = {
    sub: user.id,
    iat: timestamp,
    expiresIn: sessionConfig.expiration,
    email: user.email,
  };
  return jwt.sign(payload, sessionConfig.secret);
}

export default signToken;
