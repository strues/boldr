import {
  selectBoldr,
  selectRouter,
  selectUi,
  selectDashboard,
  selectAdmin,
} from './adminSelectors';

describe('admin selectors', () => {
  test('should select the boldr state', () => {
    const boldrState = {};
    const mockedState = {
      boldr: boldrState,
    };
    expect(selectBoldr(mockedState)).toEqual(boldrState);
  });
  test('should select the router state', () => {
    const routerState = {};
    const mockedState = {
      router: routerState,
    };
    expect(selectRouter(mockedState)).toEqual(routerState);
  });
  test('should select the dashboard state', () => {
    const dashboardState = {};
    const dashboardSelector = selectDashboard();
    const mockedState = {
      admin: {
        dashboard: dashboardState,
      },
    };
    expect(dashboardSelector(mockedState)).toEqual(dashboardState);
  });
  test('should select the ui state', () => {
    const uiState = {};
    const uiSelector = selectUi();
    const mockedState = {
      boldr: {
        ui: uiState,
      },
    };
    expect(uiSelector(mockedState)).toEqual(uiState);
  });
  test('should select the admin state', () => {
    const adminState = {};
    const mockedState = {
      admin: adminState,
    };
    expect(selectAdmin(mockedState)).toEqual(adminState);
  });
});
