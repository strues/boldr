/**
 * @jest-environment jsdom
 */

import hasWindow from './hasWindow';

test('hasWindow should exist because of JSDOM', () => {
  expect(hasWindow).toBe(true);
});
