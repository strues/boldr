import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../../../../config';

function signToken(user) {
  const roleinfo = user.roles[0].name;
  const timestamp = new Date().getTime();
  const payload = {
    iss: 'boldr',
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix(),
    email: user.email,
    role: roleinfo,
  };
  return jwt.sign(payload, config.token.secret);
}

export default signToken;
