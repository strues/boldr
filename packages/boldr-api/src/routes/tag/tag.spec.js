import request from 'supertest';
import faker from 'faker';
import app from '../../app';

const agent = request.agent(app);

describe('Tags API Endpoint', () => {
  let token;
  beforeAll(async () => {
    const loginData = {
      email: 'admin@boldr.io',
      password: 'password',
    };
    const { body } = await agent.post('/api/v1/auth/login').set('Accept', 'application/json').send(loginData);
    token = body.token;
  });

  const badTag = {
    name: '',
    description: 'i will fail',
  };

  test('+++ GET /tags', () => {
    return agent.get('/api/v1/tags').expect(res => {
      expect(res.status).toBe(200);
      expect(typeof res.body).toBe('object');
      expect(typeof res.body[0].name).toBe('string');
    });
  });
  test('+++ GET /tags/:id', () => {
    return agent.get('/api/v1/tags/1').expect(res => {
      expect(res.status).toBe(200);
      expect(typeof res.body).toBe('object');
      expect(typeof res.body.name).toBe('string');
    });
  });
  test('+++ GET /tags/posts/:id', () => {
    return agent.get('/api/v1/tags/posts/1').expect(res => {
      expect(res.status).toBe(200);
      expect(typeof res.body).toBe('object');
      expect(typeof res.body.name).toBe('string');
      expect(typeof res.body.posts).not.toBeNull();
    });
  });
  test('+++ GET /tags/:name/posts', () => {
    return agent.get('/api/v1/tags/javascript/posts').expect(res => {
      expect(res.status).toBe(200);
      expect(typeof res.body).toBe('object');
      expect(typeof res.body.name).toBe('string');
      expect(typeof res.body.posts).not.toBeNull();
    });
  });
  test('+++ Post /tags - should fail without authentication.', () => {
    return agent
      .post('/api/v1/tags')
      .send({
        name: faker.random.word(),
        description: 'a tag for a test.',
      })
      .expect(res => {
        expect(res.status).toBe(401);
      });
  });
  test('+++ Post /tags - should create a new tag.', () => {
    return agent
      .post('/api/v1/tags')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: faker.random.word(),
        description: 'a tag for a test.',
      })
      .expect(res => {
        expect(res.status).toBe(201);
      });
  });

  test('+++ Post /tags - should fail without name.', () => {
    return agent.post('/api/v1/tags').set('Authorization', `Bearer ${token}`).send(badTag).expect(res => {
      expect(res.status).toBe(400);
    });
  });
  test('+++ PUT /tags/:id - should update a tag.', () => {
    return agent
      .put('/api/v1/tags/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: faker.random.words(),
      })
      .expect(res => {
        expect(res.status).toBe(202);
      });
  });
  test('+++ PUT /tags/:id - should fail to update a tag without auth.', () => {
    return agent
      .put('/api/v1/tags/1')
      .send({
        description: faker.random.words(),
      })
      .expect(res => {
        expect(res.status).toBe(401);
      });
  });
  test('+++ DELETE /tags/:id - should delete a tag.', async () => {
    const { body } = await agent.post('/api/v1/tags').set('Authorization', `Bearer ${token}`).send({
      name: 'deleteme',
      description: 'a tag for a test.',
    });
    const tagId = body.id;
    return agent.del(`/api/v1/tags/${tagId}`).set('Authorization', `Bearer ${token}`).expect(res => {
      expect(res.status).toBe(204);
    });
  });
});
