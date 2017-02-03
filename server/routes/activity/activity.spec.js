import request from 'supertest';
import app from '../../app';

test('GET /activities', () => {
  return request(app)
      .get('/api/v1/activities')
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
      });
});
