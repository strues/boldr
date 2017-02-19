import request from 'supertest';
import app from '../../app';

const agent = request.agent(app);
describe('Activities endpoint', async () => {
  let token;
  beforeAll(async () => {
    const loginData = {
      email: 'admin@boldr.io',
      password: 'password',
    };
    const { body } = await agent.post('/api/v1/auth/login').set('Accept', 'application/json').send(loginData);
    token = body.token;
  });
  test('GET /activities', async () => {
    const { status, body } = await agent
        .get('/api/v1/activities')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBe(true);
  });
});
