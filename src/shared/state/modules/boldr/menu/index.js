import menuReducer, { STATE_KEY } from './reducer';
import {
  fetchMenus,
  fetchMenusIfNeeded,
  updateMenuDetails,
  addMenuDetail,
} from './actions';
import { selectMenus, selectMainMenu, makeSelectMainMenu } from './selectors';

export default menuReducer;
export {
  STATE_KEY,
  selectMenus,
  selectMainMenu,
  makeSelectMainMenu,
  fetchMenus,
  fetchMenusIfNeeded,
  updateMenuDetails,
  addMenuDetail,
};
