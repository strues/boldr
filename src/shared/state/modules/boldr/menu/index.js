import menuReducer, { STATE_KEY } from './reducer';
import {
  fetchMainMenu,
  fetchMainMenuIfNeeded,
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
  fetchMainMenu,
  fetchMainMenuIfNeeded,
  updateMenuDetails,
  addMenuDetail,
};
