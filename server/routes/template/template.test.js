import request from 'supertest';
import app from '../../app';

describe('Template API Endpoint', () => {
  test('+++ POST /forgot-password', () => {
    return request(app)
      .get('/api/v1/templates')
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
      });
  });
});
