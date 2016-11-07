import { InternalServer, NotImplemented } from './serverError';

describe('Server Errors', () => {
  it('InternalServer -- should expose the correct error', () => {
    const intServ = new InternalServer();
    expect(typeof intServ).toBe('object');
    expect(intServ.httpStatus).toBe(500);
  });
  it('NotImplemented -- should expose the correct error', () => {
    const notImp = new NotImplemented();
    expect(typeof notImp).toBe('object');
    expect(notImp.message).toBe('The server does not support the functionality required to fulfill the request.');
  });
});
