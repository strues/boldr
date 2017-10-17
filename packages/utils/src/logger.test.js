/**
 * @jest-environment node
 */
import logger from './logger';

describe('the logger', () => {
  beforeEach(() => {
    global.console.log = jest.fn();
    global.console.dir = jest.fn();
  });

  const acceptsOneArg = [
    { method: 'log', expectedPrefix: '' },
    { method: 'task', expectedPrefix: '✅  ' },
    { method: 'start', expectedPrefix: '\n🚀  ' },
    { method: 'end', expectedPrefix: '\n👌  ' },
    { method: 'info', expectedPrefix: '⚡  ' },
  ];
  const acceptsTwoArgs = [
    { method: 'warn', expectedPrefix: '⚠️  ' },
    { method: 'error', expectedPrefix: '\n💩  ' },
    { method: 'debug', expectedPrefix: '🐞  ' },
  ];
  const createsNewLine = ['start', 'end', 'error'];
  [...acceptsOneArg, ...acceptsTwoArgs].forEach(({ method, expectedPrefix }) => {
    it(`logger.${method}: basic usage`, () => {
      const nLogCalls = createsNewLine.includes(method) ? 2 : 1;
      logger[method]('this should be logged');
      expect(global.console.log).toBeCalledWith(`${expectedPrefix}this should be logged`);
      expect(global.console.log.mock.calls.length).toEqual(nLogCalls);
      expect(global.console.dir.mock.calls.length).toBe(0);
    });
  });
  acceptsOneArg.forEach(({ method, expectedPrefix }) => {
    it(`logger.${method}: can only take one arg`, () => {
      const nLogCalls = createsNewLine.includes(method) ? 2 : 1;
      logger[method]('here is some text', { description: 'and a second argument' });
      expect(global.console.log).toBeCalledWith(`${expectedPrefix}here is some text`);
      expect(global.console.log.mock.calls.length).toEqual(nLogCalls);
      expect(global.console.dir.mock.calls.length).toBe(0);
    });
  });
});
