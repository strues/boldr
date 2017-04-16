import React from 'react';

import {template, arrayOfTemplate} from './schema';

describe('template schema', () => {
  it('should match the normalizr-template-schema', () => {
    expect(template).toMatchSnapshot();
  });
});

describe('arrayOfTemplate', () => {
  it('should match the normalizr-arrayOfTemplate-schema', () => {
    expect(arrayOfTemplate).toMatchSnapshot();
  });
});
