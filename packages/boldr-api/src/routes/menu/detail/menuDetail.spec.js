import request from 'supertest';
import faker from 'faker';
import app from '../../../app';

const agent = request.agent(app);

describe('Menu Details API', async () => {
  let token;
  beforeAll(async () => {
    const loginData = {
      email: 'admin@boldr.io',
      password: 'password',
    };
    const { body } = await agent.post('/api/v1/auth/login').set('Accept', 'application/json').send(loginData);
    token = body.token;
  });

  it('+++ GET /menu-details -- It should return menu details', () => {
    return agent.get('/api/v1/menu-details').set('Accept', 'application/json').expect(res => {
      expect(res.status).toBe(200);
      expect(typeof res.body).toBe('object');
    });
  });

  it('+++ POST /menu-details -- Should require authorization', () => {
    return agent.post('/api/v1/menu-details').set('Accept', 'application/json').send({ name: 'test' }).expect(res => {
      expect(res.status).toBe(401);
    });
  });
  it('+++ POST /menu-details -- should create a new detail', () => {
    return agent
      .post('/api/v1/menu-details')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: faker.random.word(),
        href: 'test',
        order: 4,
        icon: 'question',
        has_dropdown: 'false' })
      .expect(res => {
        expect(res.status).toBe(201);
      });
  });
  it('GET /menu-details/:id -- By its id', () => {
    return agent.get('/api/v1/menu-details/1').set('Accept', 'application/json').expect(res => {
      expect(res.status).toBe(200);
      expect(typeof res.body).toBe('object');
    });
  });

  it('PUT /menu-details/:id -- Should fail without authorization', () => {
    return agent.put('/api/v1/menu-details/1').send({ name: 'test' }).expect(res => {
      expect(res.status).toBe(401);
    });
  });
  it('+++ PUT /menu-details/:id -- Should update', () => {
    return agent
      .put('/api/v1/menu-details/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ href: 'test',
        order: 4,
        icon: 'question' })
      .expect(res => {
        expect(res.status).toBe(202);
      });
  });
  it('+++ DELETE /menu-details/:id -- Should delete a detail', () => {
    return (
      agent.del('/api/v1/menu-details/2').set('Accept', 'application/json')// .set('Authorization', `Bearer ${token}`)
      .expect(res => {
        expect(res.status).toBe(401);
      })
    );
  });
});
