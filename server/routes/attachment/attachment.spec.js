import request from 'supertest';
import app from '../../app';

test('GET /attachments', () => {
  return request(app)
      .get('/api/v1/attachments')
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
      });
});
