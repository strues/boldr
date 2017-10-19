/**
 * @jest-environment node
 */

process.env.CFG_DIR = __dirname + '/__fixtures__/json-conf';

describe('@boldr/config [json conf]', () => {
  it('has `get` method', () => {
    const config = require('../config');
    expect(config.get('key1')).toBe('value1');
    expect(config.get('key2')).toBe(123);
    expect(config.get('key3')).toBe(false);
    expect(config.get('key4')).toBe(true);
    expect(config.get('key5')).toBeInstanceOf(Object);
    expect(config.get('key5.subKey1')).toBe(1);
    expect(config.get('key5.subKey2')).toBe('2');
    expect(config.get('key5.subKey3')).toBe('true');
    expect(config.get('key5.subKey4')).toBe(true);
    expect(config.get('routes')).toBeInstanceOf(Object);
    expect(config.get('routes.route1')).toBe('path1');
    expect(config.get('routes.route2')).toBe('path2');
    expect(config.get('routes.route3')).toBe('path3');
  });

  it('has property getter', () => {
    const config = require('../config');
    expect(config.key1).toBe('value1');
    expect(config.key2).toBe(123);
    expect(config.key3).toBe(false);
    expect(config.key4).toBe(true);
    expect(config.key5).toBeInstanceOf(Object);
    expect(config.key5.subKey1).toBe(1);
    expect(config.key5.subKey2).toBe('2');
    expect(config.key5.subKey3).toBe('true');
    expect(config.key5.subKey4).toBe(true);
  });

  it('has `has` method', () => {
    const config = require('../config');
    expect(config.has('key1')).toBe(true);
    expect(config.has('key2')).toBe(true);
    expect(config.has('key3')).toBe(true);
    expect(config.has('key4')).toBe(true);
    expect(config.has('key5')).toBe(true);
    expect(config.has('key6')).toBe(false);
    expect(config.has('key5.subKey1')).toBe(true);
    expect(config.has('key5.subKey2')).toBe(true);
    expect(config.has('key5.subKey3')).toBe(true);
    expect(config.has('key5.subKey4')).toBe(true);
    expect(config.has('key5.subKey5')).toBe(false);
  });
});
