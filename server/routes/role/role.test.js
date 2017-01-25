import supertest from 'supertest';
import listener from '../../index';

function request() {
  return supertest(listener);
}


it('GET /roles - Lists all roles', async () => {
  const { status, body } = await request()
    .get('/api/v1/roles');

  expect(status).toBe(200);
});
