import request from 'supertest';
import app from '../../app';

test('GET /pages -- It should return pages', () => {
  return request(app).get('/api/v1/pages').set('Accept', 'application/json').expect(res => {
    expect(res.status).toBe(200);
  });
});
