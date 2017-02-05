import request from 'supertest';
import app from '../../app';

describe('Attachment API Endpoint', () => {
  let token;
  beforeAll(async () => {
    const loginData = {
      email: 'admin@boldr.io',
      password: 'password',
    };
    const { body } = await request(app).post('/api/v1/auth/login').set('Accept', 'application/json').send(loginData);
    token = body.token;
  });
  test('+++ GET /attachments', () => {
    return request(app)
        .get('/api/v1/attachments')
        .expect((res) => {
          expect(res.status).toBe(200);
          expect(typeof res.body).toBe('object');
        });
  });
  test('+++ GET /attachments/:id', () => {
    return request(app)
      .get('/api/v1/attachments/013e8568-ea91-11e6-a50e-07030846d478')
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
      });
  });
});
