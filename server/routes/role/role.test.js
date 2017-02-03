import request from 'supertest';
import app from '../../app';

test('GET /roles - Lists all roles', async () => {
  return request(app)
  .get('/api/v1/roles')
  .expect((res) => {
    expect(res.status).toBe(200);
  });
});
