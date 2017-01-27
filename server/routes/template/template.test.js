import supertest from 'supertest';
import app from '../../app';

function request() {
  return supertest(app);
}

it('GET /templates -- It should return templates', async () => {
  const { status } = await request()
      .get('/api/v1/templates')
      .set('Accept', 'application/json');
  expect(status).toBe(200);
});
