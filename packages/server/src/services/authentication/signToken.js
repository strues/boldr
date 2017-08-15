const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const { config } = require('../../config');

module.exports = function signToken(user) {
  const roleinfo = user.roles[0].name;
  const payload = {
    issuer: 'boldr',
    subject: user.id,
    jti: uuid.v4(),
    expiresIn: '7 days',
    email: user.email,
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
};
