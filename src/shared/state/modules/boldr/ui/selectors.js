import { createSelector } from 'reselect';
import { selectBoldr } from '../selectors';
/**
  * UI SELECTORS
  *
  *****************************************************************/

export const selectUi = state => state.boldr.ui;

export const makeSelectUi = () => createSelector(selectBoldr, boldrState => boldrState.ui);

export const makeSelectMobile = () => createSelector(selectUi, uiState => uiState.isMobile);
