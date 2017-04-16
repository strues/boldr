import React from 'react';

import {page, arrayOfPage} from './schema';

describe('page schema', () => {
  it('should match the normalizr-page-schema', () => {
    expect(page).toMatchSnapshot();
  });
});

describe('arrayOfPage', () => {
  it('should match the normalizr-arrayOfPage-schema', () => {
    expect(arrayOfPage).toMatchSnapshot();
  });
});
