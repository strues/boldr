import test from 'ava';
import supertest from 'supertest-as-promised';

import faker from 'faker';
import server from '../../engine';

function request() {
  return supertest(server);
}

const loginData = {
  email: 'admin@boldr.io',
  password: 'password',
};

const badLoginData = {
  email: 'admin@boldr.io',
  password: 'fa',
};

test('POST /login - Incorrect password fails', async (t) => {
  const { status } = await request()
    .post('/api/v1/auth/login')
    .send(badLoginData);

  t.is(status, 401);
});
test('POST /login - Fail without a password', async (t) => {
  const { status } = await request()
    .post('/api/v1/auth/login')
    .send({ email: 'admin@boldr.io', password: '' });

  t.is(status, 400);
});
test('POST /login', async (t) => {
  const { status, body } = await request()
    .post('/api/v1/auth/login')
    .set('Accept', 'application/json')
    .send(loginData);

  t.is(status, 200);
  t.is(typeof body.token, 'string');
  t.is(typeof body.user, 'object');
  t.is(typeof body.user.role, 'object');
});

test('POST /signup -- Fail missing fields', async (t) => {
  const { status } = await request()
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({ email: 'abc@test.com' });

  t.is(status, 400);
});

test('POST /signup -- Fail email exists', async (t) => {
  const { status } = await request()
    .post('/api/v1/auth/signup')
    .set('Accept', 'application/json')
    .send({
      email: 'admin@boldr.io',
      password: 'test',
    });
  t.is(status, 400);
});

test('POST /signup -- Signup user', async (t) => {
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

  t.is(status, 201);
});

test('GET /check -- Fails w/o auth header', async (t) => {
  const { status } = await request()
    .get('/api/v1/auth/check')
    .set('Accept', 'application/json');

  t.is(status, 401);
});

let token;
test.before(async t => {
  const loginData = {
    email: 'admin@boldr.io',
    password: 'password',
  };
  const { body } = await request().post('/api/v1/auth/login').set('Accept', 'application/json').send(loginData);
  token = body.token;
});

test('GET /check -- Return user info', async (t) => {
  const { status, body } = await request()
  .get('/api/v1/auth/check')
  .set('Accept', 'application/json')
  .set('Authorization', `Bearer ${token}`);

  t.is(status, 200);
  t.is(typeof body, 'object');
});

test('GET /check -- Fail wrong header.', async (t) => {
  const { status } = await request()
  .get('/api/v1/auth/check')
  .set('Accept', 'application/json')
  .set('Authorization', `${token}`);

  t.is(status, 401);
});
