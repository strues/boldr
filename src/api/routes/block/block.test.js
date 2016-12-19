import test from 'ava';
import supertest from 'supertest-as-promised';
import server from '../../engine';

function request() {
  return supertest(server);
}

test('GET /blocks - Lists all blocks', async (t) => {
  const { status, body } = await request()
    .get('/api/v1/blocks');

  t.is(status, 200);
});
