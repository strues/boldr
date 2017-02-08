import request from 'supertest';
import db from '../../services/postgres';
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
    await db('attachment').insert({
      id: '1c462e26-df71-48ce-b363-4ae9b966e7a0',
      original_name: 'file.png',
      url: '/files/file.png',
      user_id: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
      safe_name: 'file.png',
      file_name: 'file.png',
    });
  });
  test('+++ GET /attachments', () => {
    return request(app)
        .get('/api/v1/attachments')
        .expect((res) => {
          expect(res.status).toBe(200);
          expect(typeof res.body).toBe('object');
        });
  });
  test('+++ GET /attachments/:id', () => {
    return request(app)
      .get('/api/v1/attachments/668e14aa-ebe6-11e6-8ebf-4f81f17749d5')
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
      });
  });
  test('+++ UPDATE /attachments/:id', () => {
    return request(app)
      .put('/api/v1/attachments/668e14aa-ebe6-11e6-8ebf-4f81f17749d5')
      .set('Authorization', `Bearer ${token}`)
      .send({
        file_description: `a test${Math.random()}`,
      })
      .expect((res) => {
        expect(res.status).toBe(202);
        expect(typeof res.body).toBe('object');
      });
  });
  test('+++ DELETE /attachments/:id', () => {
    return request(app)
      .del('/api/v1/attachments/1c462e26-df71-48ce-b363-4ae9b966e7a0')
      .set('Authorization', `Bearer ${token}`)
      .expect((res) => {
        expect(res.status).toBe(204);
      });
  });
});
