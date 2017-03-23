import request from 'supertest';
import app from '../../app';

let token;
beforeEach(async () => {
  const loginData = {
    email: 'admin@boldr.io',
    password: 'password',
  };
  const { body } = await request(app).post('/api/v1/auth/login').set('Accept', 'application/json').send(loginData);
  token = body.token; // eslint-disable-line
});

it('GET /stats -- Return stats', () => {
  return request(app)
    .get('/api/v1/admin/stats')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .expect(res => {
      expect(res.status).toBe(200);
      expect(typeof res.body).toBe('object');
    });
});
