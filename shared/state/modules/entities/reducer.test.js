import entitiesReducer from './reducer';

describe('Entities', () => {
  test('Should return the initial state', () => {
    expect(
        entitiesReducer(undefined, {}),
      ).toEqual({
        posts: {},
        tags: {},
        comments: {},
        attachments: {},
        users: {},
        menus: {},
        menuDetails: {},
        settings: {},
      });
  });
});
