import request from 'supertest';
import app from '../../app';

describe('Settings API', () => {
  it('GET /settings -- List', () => {
    return request(app)
      .get('/api/v1/settings')
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('GET /settings/:id -- Single setting', () => {
    return request(app)
      .get('/api/v1/settings/1')
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
      });
  });
});
