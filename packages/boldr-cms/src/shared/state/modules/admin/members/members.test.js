import membersReducer from './members';

describe('Members Duck', () => {
  it('Should return the initial state', () => {
    expect(
        membersReducer(undefined, {}),
      ).toEqual({
        loaded: false,
        loading: true,
        members: [],
        error: null,
        selected: {},
      });
  });
});
