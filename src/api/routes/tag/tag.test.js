import test from 'ava';
import supertest from 'supertest-as-promised';
import server from '../../engine';

function request() {
  return supertest(server);
}

test('GET /tags -- List', async (t) => {
  const { status, body } = await request()
    .get('/api/v1/tags')
    .set('Accept', 'application/json');

  t.is(status, 200);
});
