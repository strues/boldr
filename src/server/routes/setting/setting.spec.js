import request from 'supertest';
import faker from 'faker';
import app from '../../app';

const agent = request.agent(app);

describe('Settings API Endpoint', async () => {
  let token;
  beforeAll(async () => {
    const loginData = {
      email: 'admin@boldr.io',
      password: 'password',
    };
    const { body } = await agent
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(loginData);
    token = body.token;
  });
  test('+++ GET /settings -- List', () => {
    return agent
      .get('/api/v1/settings')
      .set('Accept', 'application/json')
      .expect(res => {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  test('+++ GET /settings/:id -- Single setting', () => {
    return agent
      .get('/api/v1/settings/1')
      .set('Accept', 'application/json')
      .expect(res => {
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
      });
  });
  test('+++ POST /settings', () => {
    return agent
      .post('/api/v1/settings')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        key: faker.random.word(),
        value: 'some',
        label: 'Some',
        description: 'this is a test setting',
      })
      .expect(res => {
        expect(res.status).toBe(201);
        expect(typeof res.body).toBe('object');
      });
  });
  test('+++ PUT /settings/:id', () => {
    return agent
      .put('/api/v1/settings/1')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'this is a test setting',
      })
      .expect(res => {
        expect(res.status).toBe(202);
        expect(typeof res.body).toBe('object');
      });
  });
});
