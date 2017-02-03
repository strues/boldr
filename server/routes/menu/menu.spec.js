import request from 'supertest';
import app from '../../app';

test('GET /menus', () => {
  return request(app)
      .get('/api/v1/menus')
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.status).toBe(200);
      });
});
