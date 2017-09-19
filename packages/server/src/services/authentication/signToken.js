import uuid from 'uuid';
import jwt from 'jsonwebtoken';
import config from '@boldr/config';

export default function signToken(account) {
  const roleinfo = account.roles[0].name;
  const payload = {
    issuer: 'boldr',
    subject: account.id,
    jti: uuid.v4(),
    expiresIn: '7 days',
    email: account.email,
    role: roleinfo,
  };
  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.get('token.secret'), (err, token) => {
      if (err) {
        return reject(err);
      }

      return resolve(token);
    });
  });
}
