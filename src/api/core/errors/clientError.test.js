import test from 'ava';
import {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  Conflict,
  UserNotVerifiedError,
} from './clientError';

test('BadRequest', (t) => {
  const badReq = new BadRequest();
  t.is(typeof badReq, 'object');
  t.is(badReq.message, 'The request could not be understood by the server due to malformed syntax.');
});

test('Unauthorized', (t) => {
  const unAuth = new Unauthorized();
  t.is(typeof unAuth, 'object');
  t.is(unAuth.status, 401);
});
test('Forbidden', (t) => {
  const forb = new Forbidden();
  t.is(typeof forb, 'object');
  t.is(forb.status, 403);
});
test('NotFound', (t) => {
  const nf = new NotFound();
  t.is(typeof nf, 'object');
  t.is(nf.status, 404);
});
test('MethodNotAllowed', (t) => {
  const notallow = new MethodNotAllowed();
  t.is(typeof notallow, 'object');
  t.is(notallow.status, 405);
});
test('Conflict', (t) => {
  const confl = new Conflict();
  t.is(typeof confl, 'object');
  t.is(confl.status, 409);
});
test('UserNotVerifiedError', (t) => {
  const verifErr = new UserNotVerifiedError();
  t.is(typeof verifErr, 'object');
  t.is(verifErr.message, 'This account has not been confirmed. Please check your email for a verification link.');
});
