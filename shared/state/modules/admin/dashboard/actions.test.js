import { showSidebar, hideSidebar, fetchSiteActivity } from './actions';
import * as t from './constants';

describe('Dashboard Actions', () => {
  describe('showSidebar', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: t.SHOW_SIDEBAR,
      };

      expect(showSidebar()).toEqual(expectedResult);
    });
  });
  describe('hideSidebar', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: t.HIDE_SIDEBAR,
      };

      expect(hideSidebar()).toEqual(expectedResult);
    });
  });
});
