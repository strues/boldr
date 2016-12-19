import * as tpl from './templates';

it('welcomeEmail -- should generate an email message', async () => {
  const verificationToken = 'test';
  const welcome = await tpl.welcomeEmail(verificationToken);

  expect(typeof welcome).toBe('string');
});

it('forgotPasswordEmail -- should generate an email message', async () => {
  const verificationToken = 'test';
  const msg = await tpl.forgotPasswordEmail(verificationToken);

  expect(typeof msg).toBe('string');
});

it('passwordModifiedEmail -- should generate an email message', async () => {
  const user = 'test';
  const mod = await tpl.passwordModifiedEmail(user);

  expect(typeof mod).toBe('string');
});
