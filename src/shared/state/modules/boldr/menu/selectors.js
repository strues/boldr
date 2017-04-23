import { createSelector } from 'reselect';
import { selectBoldr } from '../selectors';
/**
  * MENU SELECTORS
  *
  *****************************************************************/

export const selectMenus = state => state.boldr.menus;
export const selectMainMenu = state => state.boldr.menus.main;

export const makeSelectMenus = () =>
  createSelector(selectBoldr, boldrState => boldrState.menu);

export const makeSelectMainMenu = () =>
  createSelector(selectMenus, menuState => menuState.main);
