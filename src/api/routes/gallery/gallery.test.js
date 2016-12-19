import test from 'ava';
import supertest from 'supertest-as-promised';
import server from '../../engine';

function request() {
  return supertest(server);
}

test('GET /galleries - Lists all galleries', async (t) => {
  const { status, body } = await request()
    .get('/api/v1/galleries');

  t.is(status, 200);
});
