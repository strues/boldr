import supertest from 'supertest';
import faker from 'faker';
import app from '../../app';

function request() {
  return supertest(app);
}


it('GET /posts -- List', async () => {
  const { status, body } = await request()
      .get('/api/v1/posts')
      .set('Accept', 'application/json');

  expect(status).toBe(200);
  expect(Array.isArray(body)).toBe(true);
});


it('GET /posts?include=[tags] -- List w/ tags', async () => {
  const { status, body } = await request()
      .get('/api/v1/posts?include=[tags]')
      .set('Accept', 'application/json');

  expect(status).toBe(200);
  expect(Array.isArray(body[0].tags)).toBe(true);
});

it('GET /posts?include=[tags,author] -- List w/ tags/author', async () => {
  const { status, body } = await request()
      .get('/api/v1/posts?include=[tags,author]')
      .set('Accept', 'application/json');

  expect(status).toBe(200);
  expect(Array.isArray(body[0].tags)).toBe(true);
  expect(typeof body[0].author).toBe('object');
  expect(typeof body[0].slug).toBe('string');
});

it('GET /posts/pid/:id -- By id', async () => {
  const { status, body } = await request()
      .get('/api/v1/posts/pid/cb61bbae-c91e-4014-b665-3485734b88fb')
      .set('Accept', 'application/json');
  expect(status).toBe(200);
  expect(typeof body).toBe('object');
});

it('GET /posts/slug/:slug -- By slug', async () => {
  const { status, body } = await request()
      .get('/api/v1/posts/slug/nother-one')
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
          published: true,
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
          published: true,
          tags: 'foo,bar',
        });

  expect(status).toBe(201);
  expect(typeof body).toBe('object');
});
