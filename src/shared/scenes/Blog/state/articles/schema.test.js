import React from 'react';

import { article, arrayOfArticle } from './schema';

describe('article schema', () => {
  it('should match the normalizr-article-schema', () => {
    expect(article).toMatchSnapshot();
  });
});

describe('arrayOfArticle', () => {
  it('should match the normalizr-arrayOfArticle-schema', () => {
    expect(arrayOfArticle).toMatchSnapshot();
  });
});
