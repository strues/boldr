import * as t from '../../actionTypes';
import dashboardReducer from './reducer';

describe('Dashboard reducer', () => {
  it('Should return the initial state', () => {
    expect(
        dashboardReducer(undefined, {}),
      ).toEqual({
        open: true,
        loaded: false,
        loading: false,
        error: null,
        activities: [],
        stats: {},
      });
  });
  it('should hide the sidebar', () => {
    const initialState = {
      open: true,
      loaded: false,
      loading: false,
      error: null,
      activities: [],
      stats: {},
    };
    const stateAfter = {
      open: false,
      loaded: false,
      loading: false,
      error: null,
      activities: [],
      stats: {},
    };
    expect(
      dashboardReducer(initialState, {
        type: t.HIDE_SIDEBAR,
      }),
    ).toEqual(stateAfter);
  });
  it('should show the sidebar', () => {
    const initialState = {
      open: true,
      loaded: false,
      loading: false,
      error: null,
      activities: [],
      stats: {},
    };
    const stateAfter = {
      loaded: true,
      open: true,
      loading: false,
      error: null,
      activities: [],
      stats: {},
    };
    expect(
      dashboardReducer(initialState, {
        type: t.SHOW_SIDEBAR,
      }),
    ).toEqual(stateAfter);
  });
});
