import toTitle from './toTitle';

test('toTitle converts to titlecase', () => {
  const fakeTitle = 'hello';
  const outcome = 'Hello';
  expect(toTitle(fakeTitle)).toEqual(outcome);
});
