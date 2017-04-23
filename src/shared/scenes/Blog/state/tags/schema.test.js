import React from 'react';

import { tag, arrayOfTag } from './schema';

describe('tag schema', () => {
  it('should match the normalizr-tag-schema', () => {
    expect(tag).toMatchSnapshot();
  });
});

describe('arrayOfMedia', () => {
  it('should match the normalizr-arrayOfTag-schema', () => {
    expect(arrayOfTag).toMatchSnapshot();
  });
});
