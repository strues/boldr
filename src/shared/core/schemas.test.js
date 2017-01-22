import React from 'react';

import { attachment, page, menu, menuDetail } from './schemas';

describe('attachment schema', () => {
  test('should match the normalizr-attachment-schema', () => {
    expect(attachment).toMatchSnapshot();
  });
});

describe('page schema', () => {
  test('should match the normalizr-page-schema', () => {
    expect(page).toMatchSnapshot();
  });
});

describe('menu schema', () => {
  test('should match the normalizr-menu-schema', () => {
    expect(menu).toMatchSnapshot();
  });
});

describe('menuDetail schema', () => {
  test('should match the normalizr-menuDetail-schema', () => {
    expect(menuDetail).toMatchSnapshot();
  });
});
