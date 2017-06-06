import jwtAuth from './index';

describe('Storage', () => {
  let Storage;

  describe('on the client', () => {
    beforeEach(() => {
      delete require.cache[require.resolve('./storage.js')];
      Storage = require('./storage').default;
    });
    runSuite();
  });

  describe('on the server', () => {
    let windowBckp;

    beforeEach(() => {
      windowBckp = global.window;
      delete global.window;
      delete require.cache[require.resolve('./storage.js')];
      Storage = require('./storage').default;
    });

    afterEach(() => {
      global.window = windowBckp;
    });

    runSuite();
  });

  function runSuite() {
    it('is a constructor method', () => {
      const storage = new Storage();
      expect(storage).toBeInstanceOf(Storage);
    });

    describe('set()', () => {
      it('should return stored value', () => {
        const storage = new Storage();
        const foo = storage.set('foo', 'bar');
        expect(foo).toEqual('bar');
      });
    });

    describe('get()', () => {
      it('should return stored value', () => {
        const storage = new Storage();
        storage.set('foo', 'bar');
        const foo = storage.get('foo');
        expect(foo).toEqual('bar');
      });
    });

    describe('remove()', () => {
      it('should removed stored value', () => {
        const storage = new Storage();
        storage.set('foo', 'bar');
        storage.remove('foo');
        const foo = storage.get('foo');
        expect(foo).toEqual(undefined);
      });
    });
  }
});
