import test from 'ava';
import supertest from 'supertest-as-promised';
import server from '../../engine';

function request() {
  return supertest(server);
}
test('GET /activities', async (t) => {
  const { status } = await request()
      .get('/api/v1/activities');

  t.is(status, 200);
});
