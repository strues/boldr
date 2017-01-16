import supertest from 'supertest';
import listener from '../../index';

function request() {
  return supertest(listener);
}

it('GET /templates -- It should return templates', async () => {
  const { status } = await request()
      .get('/api/v1/templates')
      .set('Accept', 'application/json');
  expect(status).toBe(200);
});
