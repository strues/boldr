import supertest from 'supertest';
import faker from 'faker';
import server from '../../engine';

function request() {
  return supertest(server);
}

it('GET /posts -- List', async () => {
  const { status, body } = await request()
      .get('/api/v1/posts')
      .set('Accept', 'application/json');

  expect(status).toBe(200);
  expect(Array.isArray(body.results)).toBe(true);
});

it('GET /posts -- It should return the total number of posts', async () => {
  const { status, body } = await request()
      .get('/api/v1/posts')
      .set('Accept', 'application/json');

  expect(status).toBe(200);
  expect(body.total !== null).toBe(true);
});

it('GET /posts?include=[tags] -- List w/ tags', async () => {
  const { status, body } = await request()
      .get('/api/v1/posts?include=[tags]')
      .set('Accept', 'application/json');

  expect(status).toBe(200);
  expect(Array.isArray(body.results[0].tags)).toBe(true);
});

it('GET /posts?include=[tags,author] -- List w/ tags/author', async () => {
  const { status, body } = await request()
      .get('/api/v1/posts?include=[tags,author]')
      .set('Accept', 'application/json');

  expect(status).toBe(200);
  expect(Array.isArray(body.results[0].tags)).toBe(true);
  expect(typeof body.results[0].author).toBe('object');
  expect(typeof body.results[0].slug).toBe('string');
});

it('GET /posts/pid/:id -- By id', async () => {
  const { status, body } = await request()
      .get('/api/v1/posts/pid/5c9ed236-79f0-4ff7-93bd-2815f06c74b4')
      .set('Accept', 'application/json');
  expect(status).toBe(200);
  expect(typeof body).toBe('object');
});

it('GET /posts/slug/:slug -- By slug', async () => {
  const { status, body } = await request()
      .get('/api/v1/posts/slug/just-another-post')
      .set('Accept', 'application/json');
  expect(status).toBe(200);
  expect(typeof body).toBe('object');
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

it('POST /posts -- Fails without a title', async () => {
  const { status } = await request()
        .post('/api/v1/posts')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          // title: faker.name.title(),
          feature_image: faker.image.imageUrl(),
          content: faker.lorem.paragraphs(),
          excerpt: faker.lorem.paragraph(),
          status: 'published',
          tags: 'foo,bar',
        });

  expect(status).toBe(400);
});

it('POST /posts -- Creates new post', async () => {
  const { status, body } = await request()
        .post('/api/v1/posts')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: faker.name.title(),
          feature_image: faker.image.imageUrl(),
          content: faker.lorem.paragraphs(),
          excerpt: faker.lorem.paragraph(),
          status: 'published',
          tags: 'foo,bar',
        });

  expect(status).toBe(201);
  expect(typeof body).toBe('object');
});
