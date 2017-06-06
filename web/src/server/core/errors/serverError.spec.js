/**
 * @jest-environment node
 */
import { InternalServer, NotImplemented } from './serverError';

it('InternalServer', () => {
  const intServ = new InternalServer();
  expect(typeof intServ).toBe('object');
  expect(intServ.status).toBe(500);
});
it('NotImplemented', () => {
  const notImp = new NotImplemented();
  expect(typeof notImp).toBe('object');
  expect(notImp.status).toBe(500);
});
