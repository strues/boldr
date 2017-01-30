import supertest from 'supertest';
import app from '../../app';

function request() {
  return supertest(app);
}


it('GET /roles - Lists all roles', async () => {
  const { status, body } = await request()
    .get('/api/v1/roles');

  expect(status).toBe(200);
});
