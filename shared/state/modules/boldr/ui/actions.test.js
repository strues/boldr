import {
  showModal, hideModal, openDrawer, closeDrawer, setMobileDevice, changeLayout, updateDrawerType, updateMedia,
} from './actions';
import * as t from './constants';

describe('UI Actions', () => {
  describe('showModal', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: t.MODAL_OPEN,
      };

      expect(showModal()).toEqual(expectedResult);
    });
  });
  describe('hideModal', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: t.MODAL_CLOSED,
      };

      expect(hideModal()).toEqual(expectedResult);
    });
  });
  describe('openDrawer', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: t.OPEN_DRAWER,
      };

      expect(openDrawer()).toEqual(expectedResult);
    });
  });
  describe('closeDrawer', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: t.CLOSE_DRAWER,
      };

      expect(closeDrawer()).toEqual(expectedResult);
    });
  });
  describe('setMobileDevice', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: t.SET_MOBILE_DEVICE,
        payload: true,
      };

      expect(setMobileDevice()).toEqual(expectedResult);
    });
  });
  describe('changeLayout', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: t.CHANGE_LAYOUT,
        payload: undefined,
      };

      expect(changeLayout()).toEqual(expectedResult);
    });
  });
  describe('updateDrawerType', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: t.UPDATE_DRAWER_TYPE,
        undefined,
      };

      expect(updateDrawerType()).toEqual(expectedResult);
    });
  });
  describe('updateMedia', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: t.UPDATE_MEDIA,
        undefined,

      };

      expect(updateMedia()).toEqual(expectedResult);
    });
  });
});
