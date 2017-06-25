import request from 'supertest';
import app from '../../app';

const agent = request.agent(app);
describe('Roles API Endpoint', () => {
  test('+++ GET /roles - Lists all roles', () => {
    return agent.get('/api/v1/roles').expect(res => {
      expect(res.status).toBe(200);
      expect(typeof res.body).toBe('object');
    });
  });
  test('+++ GET /roles/:id - Get specific role', () => {
    return agent.get('/api/v1/roles/1').expect(res => {
      expect(res.status).toBe(200);
      expect(res.body.name).toEqual('Member');
    });
  });
  test('+++ GET /roles/:id/users - Get all users related to the role', () => {
    return agent.get('/api/v1/roles/1/users').expect(res => {
      expect(res.status).toBe(200);
      expect(typeof res.body.users).toBe('object');
    });
  });
});
