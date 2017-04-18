import React from 'react';

import {menu, detail} from './schema';

describe('menu schema', () => {
  it('should match the normalizr-menu-schema', () => {
    expect(menu).toMatchSnapshot();
  });
});

describe('detail', () => {
  it('should match the normalizr-detail-schema', () => {
    expect(detail).toMatchSnapshot();
  });
});
