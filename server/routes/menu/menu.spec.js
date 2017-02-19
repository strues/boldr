import request from 'supertest';
import faker from 'faker';
import app from '../../app';

const agent = request.agent(app);

describe('Menu API Endpoint', async () => {
  let token;
  beforeAll(async () => {
    const loginData = {
      email: 'admin@boldr.io',
      password: 'password',
    };
    const { body } = await agent.post('/api/v1/auth/login').set('Accept', 'application/json').send(loginData);
    token = body.token;
  });
  test('+++ GET /menus', () => {
    return agent
        .get('/api/v1/menus')
        .set('Accept', 'application/json')
        .expect((res) => {
          expect(res.status).toBe(200);
        });
  });
  test('+++ GET /menus/:id', () => {
    return agent
        .get('/api/v1/menus/1')
        .set('Accept', 'application/json')
        .expect((res) => {
          expect(res.status).toBe(200);
          expect(res.body.name).toBe('Main');
        });
  });
  test('+++ POST /menus', () => {
    return agent
        .post('/api/v1/menus')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: faker.random.word(),
          order: 1,
          restricted: false,
        })
        .expect((res) => {
          expect(res.status).toBe(201);
          expect(typeof res.body).toBe('object');
        });
  });
  // test('+++ PUT /menus/:id', () => {
  //   return agent
  //       .put('/api/v1/menus/1')
  //       .set('Accept', 'application/json')
  //       .set('Authorization', `Bearer ${token}`)
  //       .send({
  //         name: 'ABCD',
  //         order: 1,
  //         restricted: false,
  //       })
  //       .expect((res) => {
  //         expect(res.status).toBe(202);
  //       });
  // });
});
