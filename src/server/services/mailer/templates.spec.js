import * as tpl from './templates';

it('welcomeEmail -- should generate an email message', () => {
  const verificationToken = 'test';
  const welcome = tpl.welcomeEmail(verificationToken);

  expect(typeof welcome).toBe('string');
});

it('forgotPasswordEmail -- should generate an email message', () => {
  const verificationToken = 'test';
  const msg = tpl.forgotPasswordEmail(verificationToken);

  expect(typeof msg).toBe('string');
});

it('passwordModifiedEmail -- should generate an email message', () => {
  const user = 'test';
  const mod = tpl.passwordModifiedEmail(user);

  expect(typeof mod).toBe('string');
});
