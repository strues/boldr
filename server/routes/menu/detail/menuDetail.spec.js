import request from 'supertest';
import faker from 'faker';
import app from '../../../app';

describe('Menu Details API', async () => {
  let token;
  beforeAll(async () => {
    const loginData = {
      email: 'admin@boldr.io',
      password: 'password',
    };
    const { body } = await request(app).post('/api/v1/auth/login').set('Accept', 'application/json').send(loginData);
    token = body.token;
  });

  it('+++ GET /menu-details -- It should return menu details', () => {
    return request(app)
        .get('/api/v1/menu-details')
        .set('Accept', 'application/json')
        .expect((res) => {
          expect(res.status).toBe(200);
          expect(typeof res.body).toBe('object');
        });
  });

  it('+++ POST /menu-details -- Should require authorization', () => {
    return request(app)
        .post('/api/v1/menu-details')
        .set('Accept', 'application/json')
        .send({ name: 'test' })
        .expect((res) => {
          expect(res.status).toBe(401);
        });
  });
  it('+++ POST /menu-details -- should create a new detail', () => {
    return request(app)
        .post('/api/v1/menu-details')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: faker.random.word(), label: faker.random.word(), link: '/test', position: 4, icon: 'question' })
        .expect((res) => {
          expect(res.status).toBe(201);
        });
  });
  it('GET /menu-details/:id -- By its id', () => {
    return request(app)
        .get('/api/v1/menu-details/1')
        .set('Accept', 'application/json')
        .expect((res) => {
          expect(res.status).toBe(200);
          expect(typeof res.body).toBe('object');
        });
  });

  it('PUT /menu-details/:id -- Should fail without authorization', () => {
    return request(app)
        .put('/api/v1/menu-details/1')
        .set('Accept', 'application/json')
        .send({ name: 'test' })
        .expect((res) => {
          expect(res.status).toBe(401);
        });
  });
  it('+++ PUT /menu-details/:id -- Should update', () => {
    return request(app)
        .put('/api/v1/menu-details/2')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ link: '/test', position: 4, icon: 'question' })
        .expect((res) => {
          expect(res.status).toBe(202);
        });
  });
  it('+++ DELETE /menu-details/:id -- Should delete a detail', () => {
    return request(app)
        .del('/api/v1/menu-details/2')
        .set('Accept', 'application/json')
        // .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          expect(res.status).toBe(401);
        });
  });
});
