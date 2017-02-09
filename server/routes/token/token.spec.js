import request from 'supertest';
import app from '../../app';


describe('Token API Endpoint', () => {
  test('+++ POST /forgot-password', () => {
    return request(app)
      .post('/api/v1/tokens/forgot-password')
      .send({ email: 'admin@boldr.io' })
      .expect((res) => {
        expect(res.status).toBe(202);
        expect(typeof res.body).toBe('object');
      });
  });
});
