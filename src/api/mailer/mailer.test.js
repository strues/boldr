import { expect } from 'chai';
import handleMail from './mailer';

describe('Mailer', () => {
  const user = { email: 'test@test.com' };
  const mailBody = 'abc';
  const mailSubject = 'test';
  it('should generate a random token', () => {
    const mailing = handleMail(user, mailBody, mailSubject);
    expect(mailing).to.fail;
  });
});
