import React from 'react';
import {getTagIds, getTagsList, getTags} from './selectors';

const state = {
  blog: {
    tags: {
      all: {
        1: {
          id: 1,
          name: 'a',
        },
        2: {
          id: 2,
          name: 'b',
        },
        3: {
          id: 3,
          name: 'c',
        },
      },
      ids: [1, 2, 3],
    },
    posts: {},
  },
};
const ids = [1, 2, 3];
const all = {
  1: {
    id: 1,
    name: 'a',
  },
  2: {
    id: 2,
    name: 'b',
  },
  3: {
    id: 3,
    name: 'c',
  },
};

const tags = [
  {
    id: 1,
    name: 'a',
  },
  {
    id: 2,
    name: 'b',
  },
  {
    id: 3,
    name: 'c',
  },
];

describe('tag selectors', () => {
  test('+++ getTagIds -- should return tag ids', () => {
    expect(getTagIds(state)).toEqual(ids);
  });
  test('+++ getTagList -- should return all the objects', () => {
    expect(getTagsList(state)).toEqual(all);
  });
  test('+++ getTags -- should return the tags as an array of objects', () => {
    expect(getTags(state)).toEqual(tags);
  });
});
