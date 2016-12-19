import test from 'ava';

import slugIt from './slugIt';

test('replace whitespace', async (t) => {
  t.is(slugIt('hey hi hello'), 'hey-hi-hello');
  t.is(slugIt('hey hi hello', '_'), 'hey_hi_hello');
});

test('removes disallowed characters', async (t) => {
  t.is(slugIt('hey, hi hello'), 'hey-hi-hello');
  t.is(slugIt('hey- hi hello'), 'hey-hi-hello');
  t.is(slugIt('hey] hi hello'), 'hey-hi-hello');
});

test('removes whitespaces', async (t) => {
  t.is(slugIt(' hey hi hello '), 'hey-hi-hello');
});
