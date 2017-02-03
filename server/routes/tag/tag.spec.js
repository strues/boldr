import request from 'supertest';
import app from '../../app';

test('GET /tags -- List', () => {
  return request(app)
    .get('/api/v1/tags')
    .expect((res) => {
      expect(res.status).toBe(200);
    });
});
