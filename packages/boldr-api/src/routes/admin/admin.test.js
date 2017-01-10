import supertest from 'supertest';
import server from '../../engine';

function request() {
  return supertest(server);
}

let token;
beforeEach(async () => {
  const loginData = {
    email: 'admin@boldr.io',
    password: 'password',
  };
  const { body } = await request().post('/api/v1/auth/login').set('Accept', 'application/json').send(loginData);
  token = body.token;
});

it('GET /stats -- Return stats', async () => {
  const { status, body } = await request()
  .get('/api/v1/admin/stats')
  .set('Accept', 'application/json')
  .set('Authorization', `Bearer ${token}`);

  expect(status).toBe(200);
  expect(typeof body).toBe('object');
});
