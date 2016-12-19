import test from 'ava';
import supertest from 'supertest-as-promised';

import server from '../../engine';

function request() {
  return supertest(server);
}

test('GET /links -- It should return links', async (t) => {
  const { status, body } = await request()
      .get('/api/v1/links')
      .set('Accept', 'application/json');

  t.is(status, 200);
  t.is(typeof body, 'object');
});

test('POST /links -- Should require authorization', async (t) => {
  const { status } = await request()
      .post('/api/v1/links')
      .set('Accept', 'application/json')
      .send({ name: 'test' });

  t.is(status, 401);
});

test('GET /links/1 -- By its id', async (t) => {
  const { status, body } = await request()
      .get('/api/v1/links/1')
      .set('Accept', 'application/json');

  t.is(status, 200);
  t.is(typeof body, 'object');
});

test('PUT /links/1 -- Should require authorization', async (t) => {
  const { status } = await request()
      .put('/api/v1/links/1')
      .set('Accept', 'application/json')
      .send({ name: 'test' });

  t.is(status, 401);
});

test('PATCH /links/1 -- Should require authorization', async (t) => {
  const { status } = await request()
      .patch('/api/v1/links/1')
      .set('Accept', 'application/json')
      .send({ name: 'test' });

  t.is(status, 401);
});

test('DELETE /links/1 -- Should require authorization', async (t) => {
  const { status } = await request()
      .delete('/api/v1/links/1')
      .set('Accept', 'application/json');

  t.is(status, 401);
});
