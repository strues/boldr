import React from 'react';

import {media, arrayOfMedia} from './schema';

describe('media schema', () => {
  it('should match the normalizr-media-schema', () => {
    expect(media).toMatchSnapshot();
  });
});

describe('arrayOfMedia', () => {
  it('should match the normalizr-arrayOfMedia-schema', () => {
    expect(arrayOfMedia).toMatchSnapshot();
  });
});
