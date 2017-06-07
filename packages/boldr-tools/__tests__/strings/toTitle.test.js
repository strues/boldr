import toTitle from '../../src/strings/toTitle';

test('toTitle converts to titlecase', () => {
  const fakeTitle = 'hello';
  const outcome = 'Hello';
  expect(toTitle(fakeTitle)).toEqual(outcome);
});
