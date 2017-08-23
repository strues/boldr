import curry from './curry';

describe('curry', () => {
  it('should add the two numbers', () => {
    const add = (x, y) => x + y;
    let autoCurriedAdd = curry(add);
    expect(autoCurriedAdd(2)(2)).toEqual(4);
  });
  it('should multiply', () => {
    const genericTable = (x, y) => x * y;

    const tableOf2 = curry(genericTable)(2);
    expect(tableOf2(2)).toEqual(4);
  });
});
