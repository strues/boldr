import signToken from './signToken';

const user = {
  id: '2c062e26-df71-48ce-b363-4ae9b966e7a0',
  email: 'fake@email.com',
  roles: [{
    id: 1,
    uuid: '3d062e26-df71-48ce-b363-4ae9b966e7a0',
    name: 'User',
  }],
};

it('creates a signed jsonwebtoken', async () => {
  const token = await signToken(user);
  expect(typeof token).toBe('string');
});
