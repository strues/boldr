import supertest from 'supertest';
import listener from '../../index';

function request() {
  return supertest(listener);
}


it('GET /attachments', async () => {
  const { status } = await request()
      .get('/api/v1/attachments');

  expect(status).toBe(200);
});
