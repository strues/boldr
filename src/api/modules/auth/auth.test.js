import { expect } from 'chai';
import supertest from 'supertest';
import faker from 'faker';
import server from '../../engine';

function request() {
  return supertest(server.listen());
}

const loginData = {
  email: 'admin@boldr.io',
  password: 'password'
};

const badLoginData = {
  email: 'admin@boldr.io',
  password: 'fa'
};

describe('API -- Auth', () => {
  afterEach(() => {
    server.close();
  });
  describe('POST /api/v1/auth/login', () => {
    it('It should fail to login with an incorrect password', (done) => {
      request()
        .post('/api/v1/auth/login')
        .set('Accept', 'application/json')
        .send(badLoginData)
        .expect('Content-Type', /json/)
        .expect(500, done);
    });
    it('It should fail to login without a password', (done) => {
      request()
        .post('/api/v1/auth/login')
        .set('Accept', 'application/json')
        .send({ email: 'admin@boldr.io', password: '' })
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
    it('It should be able to login', (done) => {
      request()
        .post('/api/v1/auth/login')
        .set('Accept', 'application/json')
        .send(loginData)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.status).to.equal(200);
          expect(res.body).to.include.keys('token');
          expect(res.body).to.include.keys('user');
          expect(res.body.user).to.include.keys('role');
        })
        .end(done);
    });
    it('It should be return a jsonwebtoken', (done) => {
      request()
        .post('/api/v1/auth/login')
        .set('Accept', 'application/json')
        .send(loginData)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.status).to.equal(200);
          expect(res.body.token).to.not.be.null; // eslint-disable-line
        })
        .end(done);
    });
  });
  describe('POST /api/v1/auth/signup', () => {
    it('Should fail without the required fields', (done) => {
      request()
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send({ email: 'abc@test.com' })
        .expect('Content-Type', /json/)
        .expect(500, done);
    });
    it('Should fail using an existing email', (done) => {
      request()
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send({
          email: 'admin@boldr.io',
          password: 'test'
        })
        .expect('Content-Type', /json/)
        .expect(500, done);
    });
    it('Should create a new user', (done) => {
      const userData = {
        email: 'testemail@boldr.io',
        password: 'password',
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        display_name: faker.internet.userName(),
        avatar_url: faker.image.imageUrl(),
        location: faker.address.city(),
        bio: faker.lorem.paragraph(),
        website: faker.internet.url(),
        profile_image: faker.image.imageUrl(),
        birthday: '08/01/1901',
        facebook_profile: faker.internet.url(),
        linkedin_profile: faker.internet.url(),
        github_profile: faker.internet.url(),
        google_profile: faker.internet.url(),
        twitter_profile: faker.internet.url()
      };
      request()
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(201);
      done();
    });
  });
  describe('GET /api/v1/auth/check', () => {
    it('Should fail without an authorization header', (done) => {
      request()
        .get('/api/v1/auth/check')
        .set('Accept', 'application/json')
        .expect(401, done);
    });
    let token;
    beforeEach(done => {
      request()
       .post('/api/v1/auth/login')
       .send({
         email: 'admin@boldr.io',
         password: 'password'
       })
       .expect(200)
       .expect('Content-Type', /json/)
       .end((err, res) => {
         token = res.body.token;
         done();
       });
    });
    it('Should return the authenticated user\'s information', (done) => {
      request()
        .get('/api/v1/auth/check')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('Should fail with incorrect authorization header.', (done) => {
      request()
        .get('/api/v1/auth/check')
        .set('Accept', 'application/json')
        .set('authorization', `Bearer: ${token}`)
        .expect(401, done);
    });
  });
});
