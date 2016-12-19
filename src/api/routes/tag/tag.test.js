import supertest from 'supertest-as-promised';
import server from '../../engine';

function request() {
  return supertest(server);
}

it('GET /tags -- List', async () => {
  const { status, body } = await request()
    .get('/api/v1/tags')
    .set('Accept', 'application/json');

  expect(status).toBe(200);
});
