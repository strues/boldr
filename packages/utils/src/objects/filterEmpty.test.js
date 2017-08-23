import filterEmpty from './filterEmpty';

describe('filterEmpty', () => {
  const data = { name: 'test', '': '', pass: true };
  test('it should remove an empty key', () => {
    const output = { name: 'test', pass: true };

    expect(filterEmpty(data)).toEqual(output);
  });
});
