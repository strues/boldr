import dashboardReducer, { HIDE_SIDEBAR, SHOW_SIDEBAR } from './reducer';

describe('Dashboard Duck', () => {
  it('Should return the initial state', () => {
    expect(
        dashboardReducer(undefined, {}),
      ).toEqual({
        docked: true,
        open: true,
        loaded: false,
        loading: false,
        error: null,
        activities: [],
      });
  });
  it('should hide the sidebar', () => {
    const initialState = {
      docked: true,
      open: true,
      loaded: false,
      loading: false,
      error: null,
      activities: [],
    };
    const stateAfter = {
      open: false,
      docked: false,
      loaded: false,
      loading: false,
      error: null,
      activities: [],
    };
    expect(
      dashboardReducer(initialState, {
        type: HIDE_SIDEBAR,
      }),
    ).toEqual(stateAfter);
  });
  it('should show the sidebar', () => {
    const initialState = {
      docked: true,
      open: true,
      loaded: false,
      loading: false,
      error: null,
      activities: [],
    };
    const stateAfter = {
      loaded: true,
      docked: true,
      open: true,
      loading: false,
      error: null,
      activities: [],
    };
    expect(
      dashboardReducer(initialState, {
        type: SHOW_SIDEBAR,
      }),
    ).toEqual(stateAfter);
  });
});
