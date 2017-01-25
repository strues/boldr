import entitiesReducer from './entities';

describe('Entities', () => {
  test('Should return the initial state', () => {
    expect(
        entitiesReducer(undefined, {}),
      ).toEqual({
        posts: {},
        tags: {},
        attachments: {},
        users: {},
        menus: {},
        menuDetails: {},
      });
  });
});
