/* @flow */
import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../../config';

function signToken(user: Object) {
  const roleinfo = user.roles[0].name;
  const payload: AuthToken = {
    iss: 'boldr',
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix(),
    email: user.email,
    role: roleinfo,
  };
  return jwt.sign(payload, config.get('token.secret'));
}

export default signToken;
