import * as t from '../actionTypes';
import menuReducer from './reducer';

describe('Menu Reducer', () => {
  it('Should return the initial state', () => {
    expect(menuReducer(undefined, {})).toEqual({
      main: {
        id: -1,
        uuid: '',
        name: '',
        safeName: '',
        attributes: {},
        restricted: false,
        details: [],
      },
      isFetching: false,
    });
  });
});
