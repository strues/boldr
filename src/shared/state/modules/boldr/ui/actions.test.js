import {
  showModal,
  hideModal,
  setMobileDevice,
  changeLayout,
  toggleDrawer,
  CHANGE_LAYOUT,
  MODAL_OPEN,
  MODAL_CLOSED,
  SET_MOBILE_DEVICE,
  UPDATE_MEDIA,
  UPDATE_DRAWER_TYPE,
  TOGGLE_DRAWER,
  TOGGLE_SB_MENU,
  TOGGLE_SIDEBAR,
} from './actions';

describe('UI Actions', () => {
  describe('showModal', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: MODAL_OPEN,
      };

      expect(showModal()).toEqual(expectedResult);
    });
  });
  describe('hideModal', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: MODAL_CLOSED,
      };

      expect(hideModal()).toEqual(expectedResult);
    });
  });
  describe('toggleDrawer', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: TOGGLE_DRAWER,
      };

      expect(toggleDrawer()).toEqual(expectedResult);
    });
  });

  describe('setMobileDevice', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: SET_MOBILE_DEVICE,
        payload: true,
      };

      expect(setMobileDevice()).toEqual(expectedResult);
    });
  });
  describe('changeLayout', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: CHANGE_LAYOUT,
        payload: undefined,
      };

      expect(changeLayout()).toEqual(expectedResult);
    });
  });
});
