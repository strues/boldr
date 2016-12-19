import test from 'ava';
import supertest from 'supertest-as-promised';
import server from '../../engine';

function request() {
  return supertest(server);
}

test('GET /users -- List', async (t) => {
  const { status, body } = await request()
    .get('/api/v1/users')
    .set('Accept', 'application/json');

  t.is(status, 200);
  t.true(Array.isArray(body));
});

test('GET /users/:id -- ID', async (t) => {
  const { status, body } = await request()
    .get('/api/v1/users/1b062e26-df71-48ce-b363-4ae9b966e7a0')
    .set('Accept', 'application/json');
  t.is(status, 200);
  t.is(typeof body, 'object');
});
