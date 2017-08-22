import {
  BLOCK_TYPES,
  ENTITY_TYPE,
  INLINE_STYLE,
  BR_TYPE,
  KEY_CODES,
  KEYBOARD_SHORTCUTS,
  NBSP,
  HANDLED,
  NOT_HANDLED,
  EDITOR_PROPS,
} from './constants';

describe('Constants', () => {
  test('BLOCK_TYPES -- exists', () => {
    expect(BLOCK_TYPES).toBeDefined();
  });
  test('ENTITY_TYPE -- exists', () => {
    expect(ENTITY_TYPE).toBeDefined();
  });
  test('INLINE_STYLE -- exists', () => {
    expect(INLINE_STYLE).toBeDefined();
  });
  test('BR_TYPE -- exists', () => {
    expect(BR_TYPE).toBeDefined();
  });
  test('KEY_CODES -- exists', () => {
    expect(KEY_CODES).toBeDefined();
  });
  test('KEYBOARD_SHORTCUTS -- exists', () => {
    expect(KEYBOARD_SHORTCUTS).toBeDefined();
  });
  test('NBSP -- exists', () => {
    expect(NBSP).toBeDefined();
  });
  test('HANDLED -- exists', () => {
    expect(HANDLED).toBeDefined();
  });
  test('NOT_HANDLED -- exists', () => {
    expect(NOT_HANDLED).toBeDefined();
  });
  test('EDITOR_PROPS -- exists', () => {
    expect(EDITOR_PROPS).toBeDefined();
  });
});
