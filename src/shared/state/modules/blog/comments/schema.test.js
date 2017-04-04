import React from 'react';

import { comment, arrayOfComment } from './schema';

describe('comment schema', () => {
  it('should match the normalizr-comment-schema', () => {
    expect(comment).toMatchSnapshot();
  });
});

describe('arrayOfComment', () => {
  it('should match the normalizr-arrayOfComment-schema', () => {
    expect(arrayOfComment).toMatchSnapshot();
  });
});
