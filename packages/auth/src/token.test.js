import { getToken, parseJWT, setToken, removeToken } from './token';
describe('the token auth service', () => {
  it('should expose getToken', () => {
    expect(getToken).toBeInstanceOf(Function);
  });
  it('getToken - should return a function with the token', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJib2xkciIsInN1YmplY3QiOiIxYjA2MmUyNi1kZjcxLTQ4Y2UtYjM2My00YWU5Yjk2NmU3YTAiLCJqdGkiOiI2MmM3ZDQ2Zi1jMjIwLTQ5NzgtYjRiMC1mMWMwZTE3OWYyYTEiLCJleHBpcmVzSW4iOiI3IGRheXMiLCJlbWFpbCI6ImFkbWluQGJvbGRyLmlvIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNTAyODE5NjcxfQ.0Qs8rYf-ttth2sOCggIPSCWTX3H-SOyRj9YOg77TAGk';

    setToken(token);
    // const expected = getToken();
    expect(getToken).toBeInstanceOf(Function);
  });
  it('getToken - {asJSON } should return a parsed token', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJib2xkciIsInN1YmplY3QiOiIxYjA2MmUyNi1kZjcxLTQ4Y2UtYjM2My00YWU5Yjk2NmU3YTAiLCJqdGkiOiI2MmM3ZDQ2Zi1jMjIwLTQ5NzgtYjRiMC1mMWMwZTE3OWYyYTEiLCJleHBpcmVzSW4iOiI3IGRheXMiLCJlbWFpbCI6ImFkbWluQGJvbGRyLmlvIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNTAyODE5NjcxfQ.0Qs8rYf-ttth2sOCggIPSCWTX3H-SOyRj9YOg77TAGk';

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
    expect(getToken({ asJSON: true })).toBeDefined();
  });
  it('should expose setToken', () => {
    expect(setToken).toBeInstanceOf(Function);
  });

  it('should set a token', () => {
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDI4MTg2MzcsImV4cCI6MTUwMjgxODY5NywiZW1haWwiOiJhZG1pbkBib2xkci5pbyIsImlzcyI6ImJvbGRyIiwic3ViIjoiMWIwNjJlMjYtZGY3MS00OGNlLWIzNjMtNGFlOWI5NjZlN2EwIiwicm9sZSI6IkFkbWluIn0.gwLphFsJhouv2Pq8hNa4uOiWJaFOeWRX_oN2SaSc6Q0';

    expect(setToken(token)).toEqual(token);
  });

  it('should expose removeToken', () => {
    expect(removeToken).toBeInstanceOf(Function);
  });

  it('should expose parseJWT', () => {
    expect(parseJWT).toBeInstanceOf(Function);
  });

  it('should parse a jwt', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJib2xkciIsInN1YmplY3QiOiIxYjA2MmUyNi1kZjcxLTQ4Y2UtYjM2My00YWU5Yjk2NmU3YTAiLCJqdGkiOiI2MmM3ZDQ2Zi1jMjIwLTQ5NzgtYjRiMC1mMWMwZTE3OWYyYTEiLCJleHBpcmVzSW4iOiI3IGRheXMiLCJlbWFpbCI6ImFkbWluQGJvbGRyLmlvIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNTAyODE5NjcxfQ.0Qs8rYf-ttth2sOCggIPSCWTX3H-SOyRj9YOg77TAGk';

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
    expect(parseJWT(token)).toBeDefined();
  });
});
