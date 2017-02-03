import slugIt from './slugIt';

test('replace whitespace', () => {
  expect(slugIt('hey hi hello')).toBe('hey-hi-hello');
  expect(slugIt('hey hi hello', '_')).toBe('hey_hi_hello');
});

test('removes disallowed characters', () => {
  expect(slugIt('hey, hi hello')).toBe('hey-hi-hello');
  expect(slugIt('hey- hi hello')).toBe('hey-hi-hello');
  expect(slugIt('hey] hi hello')).toBe('hey-hi-hello');
});

test('removes whitespaces', () => {
  expect(slugIt(' hey hi hello ')).toBe('hey-hi-hello');
});
