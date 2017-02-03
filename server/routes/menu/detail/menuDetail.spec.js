import request from 'supertest';
import app from '../../../app';

describe('Menu Details API', () => {
  it('GET /links -- It should return links', () => {
    return request(app)
        .get('/api/v1/menu-details')
        .set('Accept', 'application/json')
        .expect((res) => {
          expect(res.status).toBe(200);
          expect(typeof res.body).toBe('object');
        });
  });

  it('POST /links -- Should require authorization', () => {
    return request(app)
        .post('/api/v1/menu-details')
        .set('Accept', 'application/json')
        .send({ name: 'test' })
        .expect((res) => {
          expect(res.status).toBe(401);
        });
  });

  it('GET /links/1 -- By its id', () => {
    return request(app)
        .get('/api/v1/menu-details/1')
        .set('Accept', 'application/json')
        .expect((res) => {
          expect(res.status).toBe(200);
          expect(typeof res.body).toBe('object');
        });
  });

  it('PUT /links/1 -- Should require authorization', () => {
    return request(app)
        .put('/api/v1/menu-details/1')
        .set('Accept', 'application/json')
        .send({ name: 'test' })
        .expect((res) => {
          expect(res.status).toBe(401);
        });
  });
});
