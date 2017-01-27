import supertest from 'supertest';
import app from '../../app';

function request() {
  return supertest(app);
}


it('GET /attachments', async () => {
  const { status } = await request()
      .get('/api/v1/attachments');

  expect(status).toBe(200);
});
