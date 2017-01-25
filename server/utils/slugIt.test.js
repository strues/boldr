import slugIt from './slugIt';

it('replace whitespace', async () => {
  expect(slugIt('hey hi hello')).toBe('hey-hi-hello');
  expect(slugIt('hey hi hello', '_')).toBe('hey_hi_hello');
});

it('removes disallowed characters', async () => {
  expect(slugIt('hey, hi hello')).toBe('hey-hi-hello');
  expect(slugIt('hey- hi hello')).toBe('hey-hi-hello');
  expect(slugIt('hey] hi hello')).toBe('hey-hi-hello');
});

it('removes whitespaces', async () => {
  expect(slugIt(' hey hi hello ')).toBe('hey-hi-hello');
});
