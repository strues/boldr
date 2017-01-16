import supertest from 'supertest';
import listener from '../../index';

function request() {
  return supertest(listener);
}

it('GET /menus', async () => {
  const { status, body } = await request()
    .get('/api/v1/menus');

  expect(status).toBe(200);
});
