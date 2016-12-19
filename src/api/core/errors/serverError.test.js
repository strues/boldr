import test from 'ava';
import { InternalServer, NotImplemented } from './serverError';

test('InternalServer', (t) => {
  const intServ = new InternalServer();
  t.is(typeof intServ, 'object');
  t.is(intServ.status, 500);
});
test('NotImplemented', (t) => {
  const notImp = new NotImplemented();
  t.is(typeof notImp, 'object');
  t.is(notImp.status, 500);
});
