import entitiesReducer from './entities';

describe('Entities Duck', () => {
  it('Should return the initial state', () => {
    expect(
        entitiesReducer(undefined, {}),
      ).toEqual({
        posts: {},
        tags: {},
        attachments: {},
        users: {},
        pages: {},
        navigations: {},
        links: {},
        settings: {},
      });
  });
});
