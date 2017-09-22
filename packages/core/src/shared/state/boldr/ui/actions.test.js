import * as t from '../actionTypes';
import {
  toggleModal,
  setMobileDevice,
  changeLayout,
  toggleDrawer,
  toggleCollapse,
} from './actions';

describe('UI Actions', () => {
  test('toggleModal -- should return the correct type', () => {
    const expectedResult = {
      type: t.TOGGLE_MODAL,
      payload: undefined,
    };

    expect(toggleModal()).toEqual(expectedResult);
  });
  test('setMobileDevice -- should return the correct type', () => {
    const expectedResult = {
      type: t.SET_MOBILE_DEVICE,
      enabled: true,
    };

    expect(setMobileDevice()).toEqual(expectedResult);
  });
  test('toggleDrawer -- should return the correct type', () => {
    const expectedResult = {
      type: t.TOGGLE_DRAWER,
      payload: undefined,
    };

    expect(toggleDrawer()).toEqual(expectedResult);
  });

  test('toggleCollapse -- should return the correct type', () => {
    const expectedResult = {
      type: t.TOGGLE_COLLAPSE,
      payload: undefined,
    };

    expect(toggleCollapse()).toEqual(expectedResult);
  });
  test('changeLayout -- should return the correct type', () => {
    const expectedResult = {
      type: t.CHANGE_LAYOUT,
      payload: undefined,
    };

    expect(changeLayout()).toEqual(expectedResult);
  });
});
