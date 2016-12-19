import test from 'ava';
import supertest from 'supertest-as-promised';
import server from '../../engine';

function request() {
  return supertest(server);
}

test('GET /roles - Lists all roles', async (t) => {
  const { status, body } = await request()
    .get('/api/v1/roles');

  t.is(status, 200);
});
