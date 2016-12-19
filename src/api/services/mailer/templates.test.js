import test from 'ava';

import * as tpl from './templates';

test('welcomeEmail -- should generate an email message', async (t) => {
  const verificationToken = 'test';
  const welcome = await tpl.welcomeEmail(verificationToken);

  t.is(typeof welcome, 'string');
});

test('forgotPasswordEmail -- should generate an email message', async (t) => {
  const verificationToken = 'test';
  const msg = await tpl.forgotPasswordEmail(verificationToken);

  t.is(typeof msg, 'string');
});

test('passwordModifiedEmail -- should generate an email message', async (t) => {
  const user = 'test';
  const mod = await tpl.passwordModifiedEmail(user);

  t.is(typeof mod, 'string');
});
