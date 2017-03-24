import membersReducer from './reducer';

describe('Members Duck', () => {
  it('Should return the initial state', () => {
    expect(membersReducer(undefined, {})).toEqual({
      loaded: false,
      loading: false,
      members: [],
      error: null,
      selected: {},
    });
  });
});
