import merge from '../../src/arrays/merge';

const LEFT = {
  debug: true,
  nested: {
    a: 'a',
    b: 'b',
    c: {
      true: true,
    },
  },
  array: ['a', 'b'],
};

const RIGHT = {
  debug: false,
  nested: {
    c: {
      true: false,
    },
  },
  array: ['c'],
};

test('simple', () => {
  const merged = merge(LEFT, RIGHT);
  expect(merged.debug).toBe(false);
});

test('nested', () => {
  const merged = merge(LEFT, RIGHT);
  expect(merged.nested.c.true).toBe(false);
});

test('arrays', () => {
  const merged = merge(LEFT, RIGHT);
  expect(merged.array.indexOf('a')).toBe(0);
  expect(merged.array.indexOf('c')).toBe(2);
});
