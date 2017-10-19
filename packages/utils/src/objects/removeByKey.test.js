/**
 * @jest-environment node
 */
import removeByKey from './removeByKey';

describe('removeByKey', () => {
  const data = { name: 'test', remove: 'me', pass: true };
  test('it should remove the key from the object', () => {
    const output = { name: 'test', pass: true };

    expect(removeByKey(data, 'remove')).toEqual(output);
  });
});
