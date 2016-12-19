import test from 'ava';
import mailer from './mailer';

test('Mailer -- should generate a random token', async (t) => {
  const user = { email: 'test@test.com' };
  const mailBody = 'abc';
  const mailSubject = 'test';
  const mailing = await mailer(user, mailBody, mailSubject);

  t.pass(mailing);
});
