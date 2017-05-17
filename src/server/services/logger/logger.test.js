import logger from './logger';

describe('Logger', () => {
  test('logger is an object', () => {
    expect(typeof logger === 'object').toBe(true);
  });
  test('logger stream is an object', () => {
    expect(typeof logger.stream === 'object').toBe(true);
  });
});
