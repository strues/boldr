import React from 'react';

import { post, arrayOfPost } from './schema';

describe('post schema', () => {
  it('should match the normalizr-post-schema', () => {
    expect(post).toMatchSnapshot();
  });
});

describe('arrayOfMedia', () => {
  it('should match the normalizr-arrayOfPost-schema', () => {
    expect(arrayOfPost).toMatchSnapshot();
  });
});
