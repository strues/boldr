import test from 'ava';
import signToken from './signToken';

const user = {
  id: '2c062e26-df71-48ce-b363-4ae9b966e7a0',
  email: 'fake@email.com',
  role: {
    id: 1,
    uuid: '3d062e26-df71-48ce-b363-4ae9b966e7a0',
    name: 'User',
  }
};

test('creates a signed jsonwebtoken', async (t) => {
  const token = await signToken(user);
  t.is(typeof token, 'string');
});
