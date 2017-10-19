/**
 * @jest-environment jsdom
 */

import ownerDocument from './ownerDocument';

test('should return document', () => {
  expect(ownerDocument).toBeDefined();
});
