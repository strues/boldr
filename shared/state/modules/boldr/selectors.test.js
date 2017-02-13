import { selectBoldr } from './selectors';

test('should select the boldr state', () => {
  const boldrState = {};
  const mockedState = {
    boldr: boldrState,
  };
  expect(selectBoldr(mockedState)).toEqual(boldrState);
});
