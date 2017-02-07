import request from 'supertest';
import app from '../../app';

describe('User API Endpoint', () => {
  test('+++ GET /users -- List', () => {
    return request(app)
        .get('/api/v1/users')
        .expect((res) => {
          expect(res.status).toBe(200);
          expect(Array.isArray(res.body)).toBe(true);
        });
  });

  test('+++ GET /users/:id -- ID', () => {
    return request(app)
        .get('/api/v1/users/1b062e26-df71-48ce-b363-4ae9b966e7a0')
        .expect((res) => {
          expect(res.status).toBe(200);
          expect(typeof res.body).toBe('object');
        });
  });
  test('+++ GET /users/:username/profile -- Profile', () => {
    return request(app)
        .get('/api/v1/users/Joey/profile')
        .expect((res) => {
          expect(res.status).toBe(200);
          expect(typeof res.body).toBe('object');
        });
  });
});
