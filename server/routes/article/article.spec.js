import request from 'supertest';
import faker from 'faker';
import db from '../../services/postgres';
import app from '../../app';

const agent = request.agent(app);
describe('Articles API Endpoint', () => {
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
    token = body.token; // eslint-disable-line
    await db('media').insert({
      id: '1c462e26-df71-48ce-b424-4ae9b966e7a0',
      url: '/files/file.png',
      userId: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
      safeName: 'ffile.png',
      fileName: 'ffile.png',
      mediaType: 1,
    });
  });
  it('GET /articles/:id -- By id', async () => {
    const { status, body } = await agent
      .get('/api/v1/articles/5c9ed236-79f0-4ff7-93bd-2815f06c74b4')
      .set('Accept', 'application/json');
    expect(status).toBe(200);
    expect(typeof body).toBe('object');
  });

  it('GET /articles/slug/:slug -- By slug', async () => {
    const { status, body } = await agent
      .get('/api/v1/articles/slug/nother-one')
      .set('Accept', 'application/json');
    expect(status).toBe(200);
    expect(typeof body).toBe('object');
  });

  it('POST /articles -- Fails without a title', async () => {
    const { status } = await agent
      .post('/api/v1/articles')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        // title: faker.name.title(),
        featureImage: '/files/file.png',
        content: faker.lorem.paragraphs(),
        excerpt: faker.lorem.paragraph(),
        published: true,
        tags: ['foo', 'bar'],
      });

    expect(status).toBe(400);
  });

  it('POST /articles -- Creates new article', async () => {
    const { status, body } = await agent
      .post('/api/v1/articles')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: faker.name.title(),
        featureImage: '/files/file.png',
        content: faker.lorem.paragraphs(),
        excerpt: faker.lorem.paragraph(),
        published: true,
        tags: ['foo', 'bar'],
      });

    expect(status).toBe(201);
    expect(typeof body).toBe('object');
    expect(body.published).toEqual(true);
  });
  it('POST /articles -- Creating a article fails if it already exists', async () => {
    const { status, body } = await agent
      .post('/api/v1/articles')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Nother One',
        featureImage: 'asdfasdfasdfasdf',
        content: 'aasdfasdf',
        excerpt: 'abavasdf',
        published: true,
        tags: ['foo', 'bar'],
      });

    expect(status).toBe(500);
    expect(typeof body).toBe('object');
  });
  it('PUT /articles/:id -- Update an article', async () => {
    const { status, body } = await agent
      .put('/api/v1/articles/cb61bbae-c91e-4014-b665-3485734b88fb')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        featureImage: faker.image.imageUrl(),
        content: faker.lorem.paragraphs(),
        excerpt: faker.lorem.paragraph(),
        published: true,
      });

    expect(status).toBe(202);
    expect(typeof body).toBe('object');
  });
  it('POST /articles/:id -- Add tag to article', async () => {
    const { status, body } = await agent
      .post('/api/v1/articles/cb61bbae-c91e-4014-b665-3485734b88fb')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'faketag',
        description: 'im a fake tag',
      });

    expect(status).toBe(202);
    expect(typeof body).toBe('object');
  });
  //
  it('GET /articles/:id/relate/:mediaId -- Relate article to media', async () => {
    const { status, body } = await agent
      .get(
        '/api/v1/articles/5c9ed236-79f0-4ff7-93bd-2815f06c74b4/relate/1c462e26-df71-48ce-b424-4ae9b966e7a0',
      ) // eslint-disable-line
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
    expect(typeof body).toBe('object');
  });
  it('GET /articles/archived -- Get articles with deleted should fail without auth', async () => {
    // eslint-disable-line
    const { status, body } = await agent
      .get('/api/v1/articles/archived') // eslint-disable-line
      .set('Accept', 'application/json');
    // .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(401);
    expect(typeof body).toBe('object');
  });
});
