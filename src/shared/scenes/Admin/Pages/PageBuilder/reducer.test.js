import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import pageBuilderReducer from './reducer';

describe('PageBuilder Duck', () => {
  it('Should return the initial state', () => {
    expect(
        pageBuilderReducer(undefined, {}),
      ).toEqual({
        loaded: false,
        loading: false,
        error: null,
      });
  });
});
