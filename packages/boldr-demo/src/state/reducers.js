import { combineReducers } from 'redux';

export function mainReducer(previousState = {}, action) {
  return previousState;
}
export const appReducer = combineReducers({
  main: mainReducer,
});

export default appReducer;
