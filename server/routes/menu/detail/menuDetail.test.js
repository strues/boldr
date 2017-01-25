import supertest from 'supertest';

import listener from '../../../index';

function request() {
  return supertest(listener);
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
