import test from 'ava';
import supertest from 'supertest-as-promised';
import server from '../../engine';

function request() {
  return supertest(server);
}

test('GET /pages -- It should return pages', async (t) => {
  const { status } = await request()
      .get('/api/v1/pages')
      .set('Accept', 'application/json');
  t.is(status, 200);
});
