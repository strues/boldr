import nock from 'nock';
import ApiClient from './apiClient';

describe('The ApiClient', () => {
  const client = new ApiClient();
  it('should declare a get method', () => {
    expect(client.get).toBeDefined();
  });
  it('should declare a post method', () => {
    expect(client.post).toBeDefined();
  });
  it('should declare a put method', () => {
    expect(client.put).toBeDefined();
  });
  it('should declare a patch method', () => {
    expect(client.patch).toBeDefined();
  });
  it('should declare a del method', () => {
    expect(client.del).toBeDefined();
  });

  it('should resolve the returned promise if the response is a success', () => {
    const toto = { description: 'Roger', test: null, test2: undefined };
    const cleandToto = { description: 'Roger' };
    const createdToto = { id: 12, description: 'Roger' };
    nock('http://localhost/').post('/api/v1/totos', cleandToto).reply(201, createdToto);

    return client.post('totos', { data: toto })
      .then((response) => {
        expect(response.status).toEqual(201);
        expect(response.body).toEqual(createdToto);
      });
  });

  it('should reject the returned promise if the response is a failure', () => {
    nock('http://localhost/').get('/api/v1/totos/12').reply(404, 'There is no such toto');

    return client.get('totos/12')
      .catch((response) => {
        expect(response.status).toEqual(404);
      });
  });
});
