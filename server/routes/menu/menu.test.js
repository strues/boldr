import supertest from 'supertest';
import app from '../../app';

function request() {
  return supertest(app);
}

it('GET /menus', async () => {
  const { status, body } = await request()
    .get('/api/v1/menus');

  expect(status).toBe(200);
});
