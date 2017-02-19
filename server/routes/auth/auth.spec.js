import request from 'supertest';
import faker from 'faker';
import app from '../../app';

const agent = request.agent(app);

describe('Auth API Endpoint', async () => {
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

  const loginData = {
    email: 'admin@boldr.io',
    password: 'password',
  };

  const badLoginData = {
    email: 'admin@boldr.io',
    password: 'fa',
  };

  test('+++ POST /login - Fail without a password', () => {
    return agent
      .post('/api/v1/auth/login')
      .send({ email: 'admin@boldr.io', password: '' })
      .expect((res) => {
        expect(res.status).toBe(401);
      });
  });
  test('+++ POST /login - Fails with the wrong password', () => {
    return agent
      .post('/api/v1/auth/login')
      .send(badLoginData)
      .expect((res) => {
        expect(res.status).toBe(401);
      });
  });
  test('+++ POST /login', () => {
    return agent
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(loginData)
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(typeof res.body.token).toBe('string');
        expect(typeof res.body.user).toBe('object');
      });
  });

  test('+++ POST /signup -- Fails with missing required fields', () => {
    return agent
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send({ email: 'abc@test.com' })
        .expect((res) => {
          expect(res.status).toBe(400);
        });
  });

  test('+++ POST /signup -- Fails if email exists', () => {
    return agent
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({
        email: 'admin@boldr.io',
        password: 'test',
      })
      .expect((res) => {
        expect(res.status).toBe(409);
      });
  });

  test('+++ POST /signup -- Signup user', () => {
    return agent
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({
        email: faker.internet.email(),
        password: 'password',
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        username: faker.internet.userName(),
        avatar_url: faker.image.imageUrl(),
      })
      .expect((res) => {
        expect(res.status).toBe(201);
      });
  });

  test('+++ GET /check -- Fails w/o auth header', () => {
    return agent
      .get('/api/v1/auth/check')
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.status).toBe(401);
      });
  });

  test('+++ GET /check -- Return user info', () => {
    return agent
    .get('/api/v1/auth/check')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .expect((res) => {
      expect(res.status).toBe(200);
      expect(typeof res.body).toBe('object');
    });
  });

  test('+++ GET /check -- Fail wrong header.', () => {
    return agent
    .get('/api/v1/auth/check')
    .set('Accept', 'application/json')
    .set('Authorization', `${token}`)
    .expect((res) => {
      expect(res.status).toBe(401);
    });
  });
});
