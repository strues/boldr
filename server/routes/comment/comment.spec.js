import request from 'supertest';
import faker from 'faker';
import db from '../../services/postgres';
import app from '../../app';

const agent = request.agent(app);
describe('Comments API Endpoint', async () => {
  let token;
  beforeAll(async () => {
    const loginData = {
      email: 'admin@boldr.io',
      password: 'password',
    };
    const { body } = await agent.post('/api/v1/auth/login').set('Accept', 'application/json').send(loginData);
    token = body.token;
    await db('comment').insert({
      id: '4f432e26-df71-48ce-b363-4ae9b966e7a0',
      content: 'Hey im a comment',
      comment_author_ip: '127.0.0.1',
      comment_author_id: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
      likes: 1,
      dislikes: 0,
    });
    await db('post_comment').insert({
      post_id: 'cb61bbae-c91e-4014-b665-3485734b88fb',
      comment_id: '4f432e26-df71-48ce-b363-4ae9b966e7a0',
    });
  });

  it('+++ PUT /:id', async () => {
    const { status, body } = await agent
          .put('/api/v1/comments/4f432e26-df71-48ce-b363-4ae9b966e7a0')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
            content: 'test',
          });

    expect(status).toBe(202);
  });
  it('+++ POST /:id/reply -- Reply to comment', async () => {
    const { status, body } = await agent
          .post('/api/v1/comments/4f432e26-df71-48ce-b363-4ae9b966e7a0/reply')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
            content: 'abcd',
          });

    expect(status).toBe(201);
    expect(typeof body).toBe('object');
  });
  it('+++ DELETE /:id', async () => {
    const { status, body } = await agent
          .del('/api/v1/comments/4f432e26-df71-48ce-b363-4ae9b966e7a0')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`);
    expect(status).toBe(204);
  });
});
