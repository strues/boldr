import supertest from 'supertest';
import server from '../../engine';

function request() {
  return supertest(server);
}

it('GET /users -- List', async () => {
  const { status, body } = await request()
    .get('/api/v1/users')
    .set('Accept', 'application/json');

  expect(status).toBe(200);
  expect(Array.isArray(body)).toBe(true);
});

it('GET /users/:id -- ID', async () => {
  const { status, body } = await request()
    .get('/api/v1/users/1b062e26-df71-48ce-b363-4ae9b966e7a0')
    .set('Accept', 'application/json');
  expect(status).toBe(200);
  expect(typeof body).toBe('object');
});
