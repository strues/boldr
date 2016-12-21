import supertest from 'supertest-as-promised';

import server from '../../engine';

function request() {
  return supertest(server);
}

it('GET /links -- It should return links', async () => {
  const { status, body } = await request()
      .get('/api/v1/menu-details')
      .set('Accept', 'application/json');

  expect(status).toBe(200);
  expect(typeof body).toBe('object');
});

it('POST /links -- Should require authorization', async () => {
  const { status } = await request()
      .post('/api/v1/menu-details')
      .set('Accept', 'application/json')
      .send({ name: 'test' });

  expect(status).toBe(401);
});

it('GET /links/1 -- By its id', async () => {
  const { status, body } = await request()
      .get('/api/v1/menu-details/1')
      .set('Accept', 'application/json');

  expect(status).toBe(200);
  expect(typeof body).toBe('object');
});

it('PUT /links/1 -- Should require authorization', async () => {
  const { status } = await request()
      .put('/api/v1/menu-details/1')
      .set('Accept', 'application/json')
      .send({ name: 'test' });

  expect(status).toBe(401);
});

it('PATCH /links/1 -- Should require authorization', async () => {
  const { status } = await request()
      .patch('/api/v1/menu-details/1')
      .set('Accept', 'application/json')
      .send({ name: 'test' });

  expect(status).toBe(401);
});

it('DELETE /links/1 -- Should require authorization', async () => {
  const { status } = await request()
      .delete('/api/v1/menu-details/1')
      .set('Accept', 'application/json');

  expect(status).toBe(401);
});
