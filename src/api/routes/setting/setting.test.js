import test from 'ava';
import supertest from 'supertest-as-promised';
import server from '../../engine';

function request() {
  return supertest(server);
}

test('GET /settings -- List', async (t) => {
  const { status, body } = await request()
    .get('/api/v1/settings')
    .set('Accept', 'application/json');

  t.is(status, 200);
  t.true(Array.isArray(body));
});

test('GET /settings/:id -- Single setting', async (t) => {
  const { status, body } = await request()
    .get('/api/v1/settings/1')
    .set('Accept', 'application/json');

  t.is(status, 200);
  t.is(typeof body, 'object');
});
