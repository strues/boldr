import { expect } from 'chai';
import { InternalServer, NotImplemented } from './serverError';

describe('Server Errors', () => {
  it('InternalServer -- should expose the correct error', () => {
    const intServ = new InternalServer();
    expect(intServ).to.be.a('error');
    expect(intServ.httpStatus).to.equal(500);
  });
  it('NotImplemented -- should expose the correct error', () => {
    const notImp = new NotImplemented();
    expect(notImp).to.be.a('error');
    expect(notImp.message).to.equal('The server does not support the functionality required to fulfill the request.');
  });
});
