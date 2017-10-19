/**
 * @jest-environment jsdom
 */

import CanUseDom from './inDOM';

test('should be in the dom', () => {
  expect(CanUseDom).toBe(true);
});
