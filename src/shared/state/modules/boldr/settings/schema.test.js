import React from 'react';

import {setting, arrayOfSetting} from './schema';

describe('setting schema', () => {
  it('should match the normalizr-setting-schema', () => {
    expect(setting).toMatchSnapshot();
  });
});

describe('arrayOfSetting', () => {
  it('should match the normalizr-arrayOfSetting-schema', () => {
    expect(arrayOfSetting).toMatchSnapshot();
  });
});
