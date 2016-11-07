import supertest from 'supertest-as-promised';
import server from '../../engine';

function request() {
  return supertest(server.listen());
}

describe('/api/v1/links', () => {
  afterEach(() => {
    server.close();
  });
  it('It should return links', async () => {
    const { status, body } = await request()
        .get('/api/v1/links')
        .set('Accept', 'application/json');

    expect('Content-Type', /json/);
    expect(status).toBe(200);
    expect(typeof body).toBe('object');
  });
  test('POSTing -- Should require authorization', async () => {
    const { status } = await request()
        .post('/api/v1/links')
        .set('Accept', 'application/json')
        .send({ name: 'test' });

    expect(status).toBe(401);
  });

  test('Should retrieve a link by its id', async () => {
    const { status, body } = await request()
        .get('/api/v1/links/1')
        .set('Accept', 'application/json');

    expect(status).toBe(200);
    expect(typeof body).toBe('object');
  });

  test('PUTing -- Should require authorization', async () => {
    const { status } = await request()
        .put('/api/v1/links/1')
        .set('Accept', 'application/json')
        .send({ name: 'test' });

    expect(status).toBe(401);
  });
  test('PATCHing -- Should require authorization', async () => {
    const { status } = await request()
        .patch('/api/v1/links/1')
        .set('Accept', 'application/json')
        .send({ name: 'test' });

    expect(status).toBe(401);
  });
  test('DELETing -- Should require authorization', async () => {
    const { status } = await request()
        .delete('/api/v1/links/1')
        .set('Accept', 'application/json');

    expect(status).toBe(401);
  });
});
