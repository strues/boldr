import membersReducer from './reducer';

describe('Members Duck', () => {
  it('Should return the initial state', () => {
    expect(membersReducer(undefined, {})).toEqual({
      all: {},
      ids: [],
      isFetching: false,
      currentMember: {},
    });
  });
});
