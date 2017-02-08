import request from 'supertest';
import app from '../../app';

const agent = request.agent(app);

describe('Token API Endpoint', () => {
  test('+++ POST /forgot-password', () => {
    return agent
      .post('/api/v1/tokens/forgot-password')
      .send({ email: 'admin@boldr.io' })
      .expect((res) => {
        expect(res.status).toBe(202);
        expect(typeof res.body).toBe('object');
      });
  });
});
