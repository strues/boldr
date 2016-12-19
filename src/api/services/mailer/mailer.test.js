import mailer from './mailer';

it('Mailer -- should generate a random token', async () => {
  const user = { email: 'test@test.com' };
  const mailBody = 'abc';
  const mailSubject = 'test';
  const mailing = await mailer(user, mailBody, mailSubject);
});
