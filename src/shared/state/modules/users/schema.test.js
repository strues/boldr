import React from 'react';

import {user, arrayOfUsers} from './schema';

describe('user schema', () => {
  it('should match the normalizr-user-schema', () => {
    expect(user).toMatchSnapshot();
  });
});

describe('arrayOfUsers', () => {
  it('should match the normalizr-arrayOfUsers-schema', () => {
    expect(arrayOfUsers).toMatchSnapshot();
  });
});
