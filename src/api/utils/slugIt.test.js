import { expect, assert } from 'chai';
import slugIt from './slugIt';

describe('slugIt', () => {
  it('replace whitespaces with replacement', () => {
    assert.equal(slugIt('foo bar baz'), 'foo-bar-baz');
    assert.equal(slugIt('foo bar baz', '_'), 'foo_bar_baz');
  });

  it('remove trailing space if any', () => {
    assert.equal(slugIt(' foo bar baz '), 'foo-bar-baz');
  });

  it('remove not allowed chars', () => {
    assert.equal(slugIt('foo, bar baz'), 'foo-bar-baz');
    assert.equal(slugIt('foo- bar baz'), 'foo-bar-baz');
    assert.equal(slugIt('foo] bar baz'), 'foo-bar-baz');
  });
});
