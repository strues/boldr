import * as t from '../actionTypes';
import { showModal, hideModal, setMobileDevice, changeLayout } from './actions';

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
});
