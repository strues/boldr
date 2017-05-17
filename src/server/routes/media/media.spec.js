import path from 'path';
import request from 'supertest';
import db from '../../services/postgres';
import app from '../../app';

const agent = request.agent(app);

describe('Media API Endpoint', () => {
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
      id: '1c462e26-df71-48ce-b363-4ae9b966e7a0',
      url: '/files/file.png',
      userId: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
      safeName: 'fiele.png',
      fileName: 'fiele.png',
      mediaType: 1,
    });
  });
  test('+++ GET /media', () => {
    return agent.get('/api/v1/media').expect(res => {
      expect(res.status).toBe(200);
      expect(typeof res.body).toBe('object');
    });
  });
  test('+++ GET /media/:id', () => {
    return agent
      .get('/api/v1/media/1c462e26-df71-48ce-b363-4ae9b966e7a0')
      .expect(res => {
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
      });
  });
  test('+++ UPDATE /media/:id', () => {
    return agent
      .put('/api/v1/media/1c462e26-df71-48ce-b363-4ae9b966e7a0')
      .set('Authorization', `Bearer ${token}`)
      .send({
        fileDescription: `a test${Math.random()}`,
      })
      .expect(res => {
        expect(res.status).toBe(202);
        expect(typeof res.body).toBe('object');
      });
  });
  test('+++ DELETE /media/:id', () => {
    return agent
      .del('/api/v1/media/1c462e26-df71-48ce-b363-4ae9b966e7a0')
      .set('Authorization', `Bearer ${token}`)
      .expect(res => {
        expect(res.status).toBe(204);
      });
  });
  test('+++ POST /media', () => {
    return agent
      .post('/api/v1/media')
      .set('Authorization', `Bearer ${token}`)
      .field('mediaType', 1)
      .attach('file', path.join(__dirname, '__fixtures__/fix.png'))
      .expect(res => {
        expect(res.status).toBe(201);
      });
  });
});
