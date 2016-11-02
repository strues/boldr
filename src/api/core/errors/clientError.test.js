import { expect } from 'chai';
import supertest from 'supertest';
import server from '../../engine';
import {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  Conflict,
  AccountNotVerifiedError
} from './clientError';

function request() {
  return supertest(server.listen());
}

describe('Client Errors', () => {
  afterEach(() => {
    server.close();
  });
  it('BadRequest -- should expose the correct error', () => {
    const badReq = new BadRequest();
    expect(badReq).to.be.a('error');
    expect(badReq.message).to.equal('The request could not be understood by the server due to malformed syntax.');
  });
  it('Unauthorized -- should expose the correct error', () => {
    const unAuth = new Unauthorized();
    expect(unAuth).to.be.a('error');
    expect(unAuth.httpStatus).to.equal(401);
  });
  it('Unauthorized -- should expose the correct error', () => {
    const forb = new Forbidden();
    expect(forb).to.be.a('error');
    expect(forb.httpStatus).to.equal(403);
  });
  it('Unauthorized -- should expose the correct error', () => {
    const nf = new NotFound();
    expect(nf).to.be.a('error');
    expect(nf.httpStatus).to.equal(404);
  });
  it('Unauthorized -- should expose the correct error', () => {
    const notallow = new MethodNotAllowed();
    expect(notallow).to.be.a('error');
    expect(notallow.httpStatus).to.equal(405);
  });
  it('Conflict -- should expose the correct error', () => {
    const confl = new Conflict();
    expect(confl).to.be.a('error');
    expect(confl.httpStatus).to.equal(409);
  });
  it('AccountNotVerifiedError -- should expose the correct error', () => {
    const verifErr = new AccountNotVerifiedError();
    expect(verifErr).to.be.a('error');
    expect(verifErr.message).to.equal('This account has not been confirmed. Please check your email for a verification link.');
  });
});
