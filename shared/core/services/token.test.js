import * as auth from './token';

describe('the token auth service', () => {
  it('should expose getToken', () => {
    expect(auth.getToken).toBeInstanceOf(Function);
  });

  it('should expose setToken', () => {
    expect(auth.setToken).toBeInstanceOf(Function);
  });

  it('should expose removeToken', () => {
    expect(auth.removeToken).toBeInstanceOf(Function);
  });
});
