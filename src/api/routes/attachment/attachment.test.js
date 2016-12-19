import test from 'ava';
import supertest from 'supertest-as-promised';
import server from '../../engine';

function request() {
  return supertest(server);
}

test('GET /attachments', async (t) => {
  const { status } = await request()
      .get('/api/v1/attachments');

  t.is(status, 200);
});
