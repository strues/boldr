import path from 'path';
import request from 'supertest';
import db from '../../services/postgres';
import app from '../../app';

const agent = request.agent(app);

describe('Attachment API Endpoint', () => {
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
    await db('attachment')
      .insert({
        id: '1c462e26-df71-48ce-b363-4ae9b966e7a0',
        url: '/files/file.png',
        userId: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
        safeName: 'file.png',
        fileName: 'file.png',
      })
      .insert({
        id: '1c462e26-df71-48ce-b363-4ae9b966e7a2',
        url: '/files/file.png',
        userId: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
        safeName: 'file.png',
        fileName: 'file.png',
      });
  });
  test('+++ GET /attachments', () => {
    return agent.get('/api/v1/attachments').expect(res => {
      expect(res.status).toBe(200);
      expect(typeof res.body).toBe('object');
    });
  });
  test('+++ GET /attachments/:id', () => {
    return agent
      .get('/api/v1/attachments/1c462e26-df71-48ce-b363-4ae9b966e7a2')
      .expect(res => {
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
      });
  });
  test('+++ UPDATE /attachments/:id', () => {
    return agent
      .put('/api/v1/attachments/1c462e26-df71-48ce-b363-4ae9b966e7a2')
      .set('Authorization', `Bearer ${token}`)
      .send({
        fileDescription: `a test${Math.random()}`,
      })
      .expect(res => {
        expect(res.status).toBe(202);
        expect(typeof res.body).toBe('object');
      });
  });
  // test('+++ DELETE /attachments/:id', () => {
  //   return agent
  //     .del('/api/v1/attachments/1c462e26-df71-48ce-b363-4ae9b966e7a0')
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect(res => {
  //       expect(res.status).toBe(204);
  //     });
  // });
  test('+++ POST /attachments', () => {
    return agent
      .post('/api/v1/attachments')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', path.join(__dirname, '__fixtures__/fix.png'))
      .expect(res => {
        expect(res.status).toBe(201);
      });
  });
});
