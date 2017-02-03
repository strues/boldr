import request from 'supertest';
import app from '../../app';

describe('Attachment API Endpoint', () => {
  let token;
  beforeAll(async () => {
    const loginData = {
      email: 'admin@boldr.io',
      password: 'password',
    };
    const { body } = await request(app).post('/api/v1/auth/login').set('Accept', 'application/json').send(loginData);
    token = body.token;
  });
  test('+++ GET /attachments', () => {
    return request(app)
        .get('/api/v1/attachments')
        .expect((res) => {
          expect(res.status).toBe(200);
          expect(typeof res.body).toBe('object');
        });
  });
  //
  // test('+++ GET /attachments/:id', async () => {
  //   const { body } = await request(app)
  //     .post('/api/v1/tags')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({
  //       name: faker.random.word(),
  //       description: 'a tag for a test.',
  //     });
  //   const tagId = body.id;
  //   const postid = 'cb61bbae-c91e-4014-b665-3485734b88fb';
  //   return request(app)
  //   .get(`/api/v1/tags/${tagId}/relate/${postid}`)
  //   .set('Authorization', `Bearer ${token}`)
  //   .expect((res) => {
  //     expect(res.status).toBe(200);
  //   });
  // });
});
