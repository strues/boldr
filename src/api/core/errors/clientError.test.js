import {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  Conflict,
  AccountNotVerifiedError
} from './clientError';

describe('Client Errors', () => {
  it('BadRequest -- should expose the correct error', () => {
    const badReq = new BadRequest();
    expect(typeof badReq).toBe('object');
    expect(badReq.message).toBe('The request could not be understood by the server due to malformed syntax.');
  });
  it('Unauthorized -- should expose the correct error', () => {
    const unAuth = new Unauthorized();
    expect(typeof unAuth).toBe('object');
    expect(unAuth.httpStatus).toBe(401);
  });
  it('Unauthorized -- should expose the correct error', () => {
    const forb = new Forbidden();
    expect(typeof forb).toBe('object');
    expect(forb.httpStatus).toBe(403);
  });
  it('Unauthorized -- should expose the correct error', () => {
    const nf = new NotFound();
    expect(typeof nf).toBe('object');
    expect(nf.httpStatus).toBe(404);
  });
  it('Unauthorized -- should expose the correct error', () => {
    const notallow = new MethodNotAllowed();
    expect(typeof notallow).toBe('object');
    expect(notallow.httpStatus).toBe(405);
  });
  it('Conflict -- should expose the correct error', () => {
    const confl = new Conflict();
    expect(typeof confl).toBe('object');
    expect(confl.httpStatus).toBe(409);
  });
  it('AccountNotVerifiedError -- should expose the correct error', () => {
    const verifErr = new AccountNotVerifiedError();
    expect(typeof verifErr).toBe('object');
    expect(verifErr.message).toBe('This account has not been confirmed. Please check your email for a verification link.');
  });
});
