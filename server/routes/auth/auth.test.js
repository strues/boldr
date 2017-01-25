import supertest from 'supertest';

import faker from 'faker';
import listener from '../../index';

function request() {
  return supertest(listener);
}


const loginData = {
  email: 'admin@boldr.io',
  password: 'password',
};

const badLoginData = {
  email: 'admin@boldr.io',
  password: 'fa',
};

// it('POST /login - Incorrect password fails', async () => {
//   const { status } = await request()
//     .post('/api/v1/auth/login')
//     .send(badLoginData);
//
//   expect(status).toBe(401);
// });
it('POST /login - Fail without a password', async () => {
  const { status } = await request()
    .post('/api/v1/auth/login')
    .send({ email: 'admin@boldr.io', password: '' });

  expect(status).toBe(400);
});
it('POST /login', async () => {
  const { status, body } = await request()
    .post('/api/v1/auth/login')
    .set('Accept', 'application/json')
    .send(loginData);

  expect(status).toBe(200);
  expect(typeof body.token).toBe('string');
  expect(typeof body.user).toBe('object');
  // expect(typeof body.user.roles).toBe('array');
});

it('POST /signup -- Fail missing fields', async () => {
  const { status } = await request()
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({ email: 'abc@test.com' });

  expect(status).toBe(400);
});

it('POST /signup -- Fail email exists', async () => {
  const { status } = await request()
    .post('/api/v1/auth/signup')
    .set('Accept', 'application/json')
    .send({
      email: 'admin@boldr.io',
      password: 'test',
    });
  expect(status).toBe(400);
});

it('POST /signup -- Signup user', async () => {
  const userData = {
    email: faker.internet.email(),
    password: 'password',
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    display_name: faker.internet.userName(),
    avatar_url: faker.image.imageUrl(),
  };
  const { status } = await request()
    .post('/api/v1/auth/signup')
    .send(userData);

  expect(status).toBe(201);
});

it('GET /check -- Fails w/o auth header', async () => {
  const { status } = await request()
    .get('/api/v1/auth/check')
    .set('Accept', 'application/json');

  expect(status).toBe(401);
});

let token;
beforeEach(async () => {
  const loginData = {
    email: 'admin@boldr.io',
    password: 'password',
  };
  const { body } = await request().post('/api/v1/auth/login').set('Accept', 'application/json').send(loginData);
  token = body.token;
});

it('GET /check -- Return user info', async () => {
  const { status, body } = await request()
  .get('/api/v1/auth/check')
  .set('Accept', 'application/json')
  .set('Authorization', `Bearer ${token}`);

  expect(status).toBe(200);
  expect(typeof body).toBe('object');
});

it('GET /check -- Fail wrong header.', async () => {
  const { status } = await request()
  .get('/api/v1/auth/check')
  .set('Accept', 'application/json')
  .set('Authorization', `${token}`);

  expect(status).toBe(401);
});
