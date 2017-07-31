import { getToken, parseJWT, setToken, removeToken } from './token';

describe('the token auth service', () => {
  it('should expose getToken', () => {
    expect(getToken).toBeInstanceOf(Function);
  });
  it('getToken - should return a function with the token', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJib2xkciIsInN1YmplY3QiOiIxYjA2MmUyNi1kZjcxLTQ4Y2UtYjM2My00YWU5Yjk2NmU3YTAiLCJhbGdvcml0aG1zIjpbIkhTMjU2Il0sImV4cGlyZXNJbiI6IjcgZGF5cyIsImVtYWlsIjoiYWRtaW5AYm9sZHIuaW8iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE0OTg3NzE2MjB9.D-4CsQ04c58yMWdqi6t_rAyeg5FjRWNTrz0vGiYGjKo';
    setToken(token);
    // const expected = getToken();
    expect(getToken).toBeInstanceOf(Function);
  });
  it('getToken - {asJSON } should return a parsed token', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJib2xkciIsInN1YmplY3QiOiIxYjA2MmUyNi1kZjcxLTQ4Y2UtYjM2My00YWU5Yjk2NmU3YTAiLCJhbGdvcml0aG1zIjpbIkhTMjU2Il0sImV4cGlyZXNJbiI6IjcgZGF5cyIsImVtYWlsIjoiYWRtaW5AYm9sZHIuaW8iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE0OTg3NzE2MjB9.D-4CsQ04c58yMWdqi6t_rAyeg5FjRWNTrz0vGiYGjKo';
    setToken(token);
    const output = {
      header: { alg: 'HS256', typ: 'JWT' },
      payload: {
        issuer: 'boldr',
        subject: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
        algorithms: ['HS256'],
        expiresIn: '7 days',
        email: 'admin@boldr.io',
        role: 'Admin',
        iat: 1498771620,
      },
      signature: '\u000fî\u0002±\r8s21gj«¬\fcEcS¯=/\u001a&\u0006ª',
    };
    expect(getToken({ asJSON: true })).toEqual(output);
  });
  it('should expose setToken', () => {
    expect(setToken).toBeInstanceOf(Function);
  });

  it('should set a token', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJib2xkciIsInN1YmplY3QiOiIxYjA2MmUyNi1kZjcxLTQ4Y2UtYjM2My00YWU5Yjk2NmU3YTAiLCJhbGdvcml0aG1zIjpbIkhTMjU2Il0sImV4cGlyZXNJbiI6IjcgZGF5cyIsImVtYWlsIjoiYWRtaW5AYm9sZHIuaW8iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE0OTg3NzE2MjB9.D-4CsQ04c58yMWdqi6t_rAyeg5FjRWNTrz0vGiYGjKo';
    expect(setToken(token)).toBeTruthy();
  });

  it('should expose removeToken', () => {
    expect(removeToken).toBeInstanceOf(Function);
  });

  it('should expose parseJWT', () => {
    expect(parseJWT).toBeInstanceOf(Function);
  });

  it('should parse a jwt', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJib2xkciIsInN1YmplY3QiOiIxYjA2MmUyNi1kZjcxLTQ4Y2UtYjM2My00YWU5Yjk2NmU3YTAiLCJhbGdvcml0aG1zIjpbIkhTMjU2Il0sImV4cGlyZXNJbiI6IjcgZGF5cyIsImVtYWlsIjoiYWRtaW5AYm9sZHIuaW8iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE0OTg3NzE2MjB9.D-4CsQ04c58yMWdqi6t_rAyeg5FjRWNTrz0vGiYGjKo';
    const output = {
      header: { alg: 'HS256', typ: 'JWT' },
      payload: {
        issuer: 'boldr',
        subject: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
        algorithms: ['HS256'],
        expiresIn: '7 days',
        email: 'admin@boldr.io',
        role: 'Admin',
        iat: 1498771620,
      },
      signature: '\u000fî\u0002±\r8s21gj«¬\fcEcS¯=/\u001a&\u0006ª',
    };
    expect(parseJWT(token)).toEqual(output);
  });
});
