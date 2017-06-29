/**
 * @jest-environment node
 */
import {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  Conflict,
  UserNotVerifiedError,
} from './clientError';

it('BadRequest', () => {
  const badReq = new BadRequest();
  expect(typeof badReq).toBe('object');
  expect(badReq.message).toBe(
    'The request could not be understood by the server due to malformed syntax.',
  );
});

it('Unauthorized', () => {
  const unAuth = new Unauthorized();
  expect(typeof unAuth).toBe('object');
  expect(unAuth.status).toBe(401);
});
it('Forbidden', () => {
  const forb = new Forbidden();
  expect(typeof forb).toBe('object');
  expect(forb.status).toBe(403);
});
it('NotFound', () => {
  const nf = new NotFound();
  expect(typeof nf).toBe('object');
  expect(nf.status).toBe(404);
});
it('MethodNotAllowed', () => {
  const notallow = new MethodNotAllowed();
  expect(typeof notallow).toBe('object');
  expect(notallow.status).toBe(405);
});
it('Conflict', () => {
  const confl = new Conflict();
  expect(typeof confl).toBe('object');
  expect(confl.status).toBe(409);
});
it('UserNotVerifiedError', () => {
  const verifErr = new UserNotVerifiedError();
  expect(typeof verifErr).toBe('object');
  expect(verifErr.message).toBe(
    'This account has not been confirmed. Please check your email for a verification link.',
  );
});
