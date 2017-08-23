import reduce from './reduce';

describe('reduce', () => {
  const data = [1, 2, 3, 4, 5];
  test('it should sum the values in the array', () => {
    const outcome = [15];
    expect(reduce(data, (acc, val) => acc + val, 0)).toEqual(outcome);
  });

  test('it should multiply the values in the array', () => {
    const outcome = [120];
    expect(reduce(data, (acc, val) => acc * val, 1)).toEqual(outcome);
  });
});
