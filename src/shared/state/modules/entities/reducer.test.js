import entitiesReducer from './reducer';

describe('Entities', () => {
  test('Should return the initial state', () => {
    expect(entitiesReducer(undefined, {})).toEqual({
      posts: {},
      tags: {},
      attachments: {},
      users: {},
      media: {},
      menus: {},
      menuDetails: {},
      settings: {},
    });
  });
});
