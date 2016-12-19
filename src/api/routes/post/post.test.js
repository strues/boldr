import test from 'ava';
import supertest from 'supertest-as-promised';
import faker from 'faker';
import server from '../../engine';

function request() {
  return supertest(server);
}

test('GET /posts -- List', async (t) => {
  const { status, body } = await request()
      .get('/api/v1/posts')
      .set('Accept', 'application/json');

  t.is(status, 200);
  t.true(Array.isArray(body.results));
});

test('GET /posts -- It should return the total number of posts', async (t) => {
  const { status, body } = await request()
      .get('/api/v1/posts')
      .set('Accept', 'application/json');

  t.is(status, 200);
  t.true(body.total !== null);
});

test('GET /posts?include=[tags] -- List w/ tags', async (t) => {
  const { status, body } = await request()
      .get('/api/v1/posts?include=[tags]')
      .set('Accept', 'application/json');

  t.is(status, 200);
  t.true(Array.isArray(body.results[0].tags));
});

test('GET /posts?include=[tags,author] -- List w/ tags/author', async (t) => {
  const { status, body } = await request()
      .get('/api/v1/posts?include=[tags,author]')
      .set('Accept', 'application/json');

  t.is(status, 200);
  t.true(Array.isArray(body.results[0].tags));
  t.is(typeof body.results[0].author, 'object');
  t.is(typeof body.results[0].slug, 'string');
});

test('GET /posts/pid/:id -- By id', async (t) => {
  const { status, body } = await request()
      .get('/api/v1/posts/pid/5c9ed236-79f0-4ff7-93bd-2815f06c74b4')
      .set('Accept', 'application/json');
  t.is(status, 200);
  t.is(typeof body, 'object');
});

test('GET /posts/slug/:slug -- By slug', async (t) => {
  const { status, body } = await request()
      .get('/api/v1/posts/slug/just-another-post')
      .set('Accept', 'application/json');
  t.is(status, 200);
  t.is(typeof body, 'object');
});

let token;
test.before(async (t) => {
  const loginData = {
    email: 'admin@boldr.io',
    password: 'password',
  };
  const { body } = await request().post('/api/v1/auth/login').set('Accept', 'application/json').send(loginData);
  token = body.token;
});

test('POST /posts -- Fails without a title', async (t) => {
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

  t.is(status, 400);
});

test('POST /posts -- Creates new post', async (t) => {
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

  t.is(status, 201);
  t.is(typeof body, 'object');
});
