import request from 'supertest';
import faker from 'faker';
import app from '../../app';

const agent = request.agent(app);
describe('Posts API Endpoint', async () => {
  let token;
  beforeAll(async () => {
    const loginData = {
      email: 'admin@boldr.io',
      password: 'password',
    };
    const { body } = await agent.post('/api/v1/auth/login').set('Accept', 'application/json').send(loginData);
    token = body.token;
  });

  it('GET /posts -- List', async () => {
    const { status, body } = await agent
        .get('/api/v1/posts')
        .set('Accept', 'application/json');

    expect(status).toBe(200);
    expect(Array.isArray(body[0].tags)).toBe(true);
    expect(typeof body[0].author).toBe('object');
    expect(typeof body[0].slug).toBe('string');
  });

  it('GET /posts/pid/:id -- By id', async () => {
    const { status, body } = await agent
        .get('/api/v1/posts/pid/cb61bbae-c91e-4014-b665-3485734b88fb')
        .set('Accept', 'application/json');
    expect(status).toBe(200);
    expect(typeof body).toBe('object');
  });

  it('GET /posts/slug/:slug -- By slug', async () => {
    const { status, body } = await agent
        .get('/api/v1/posts/slug/nother-one')
        .set('Accept', 'application/json');
    expect(status).toBe(200);
    expect(typeof body).toBe('object');
  });

  it('POST /posts -- Fails without a title', async () => {
    const { status } = await agent
          .post('/api/v1/posts')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
            // title: faker.name.title(),
            feature_image: faker.image.imageUrl(),
            content: faker.lorem.paragraphs(),
            excerpt: faker.lorem.paragraph(),
            published: true,
            tags: ['foo', 'bar'],
          });

    expect(status).toBe(400);
  });

  it('POST /posts -- Creates new post', async () => {
    const { status, body } = await agent
          .post('/api/v1/posts')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
            title: faker.name.title(),
            feature_image: faker.image.imageUrl(),
            content: faker.lorem.paragraphs(),
            excerpt: faker.lorem.paragraph(),
            published: true,
            tags: ['foo', 'bar'],
          });

    expect(status).toBe(201);
    expect(typeof body).toBe('string');
  });
  it('POST /posts -- Creating a post fails if it already exists', async () => {
    const { status, body } = await agent
          .post('/api/v1/posts')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
            title: 'Nother One',
            feature_image: 'asdfasdfasdfasdf',
            content: 'aasdfasdf',
            excerpt: 'abavasdf',
            published: true,
            tags: ['foo', 'bar'],
          });

    expect(status).toBe(500);
    expect(typeof body).toBe('object');
  });
  it('PUT /posts/:id -- Update a post', async () => {
    const { status, body } = await agent
          .put('/api/v1/posts/pid/cb61bbae-c91e-4014-b665-3485734b88fb')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
            feature_image: faker.image.imageUrl(),
            content: faker.lorem.paragraphs(),
            excerpt: faker.lorem.paragraph(),
            published: true,
          });

    expect(status).toBe(202);
    expect(typeof body).toBe('object');
  });
  it('POST /posts/:id -- Add tag to post', async () => {
    const { status, body } = await agent
          .post('/api/v1/posts/pid/cb61bbae-c91e-4014-b665-3485734b88fb')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: faker.random.word(),
            description: 'im a fake tag',
          });

    expect(status).toBe(202);
    expect(typeof body).toBe('object');
  });
});
