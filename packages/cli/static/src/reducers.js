import { reducer as formReducer } from 'redux-form';
// import blogReducer from './scenes/Blog/state/reducer';
// import adminReducer from './scenes/Admin/state/reducer';
// import authReducer from './scenes/Account/state/reducer';

/*
  The rootReducer here is passed into createBoldrStore(). Not necessary to
  use combineReducers here, happens in @boldr/core

  All we need is an object with the reducers
 */
function emptyReducer(previousState = {}, action) {
  return previousState;
}

const rootReducer = {
  // map additional reducers here
  form: formReducer,
  empty: emptyReducer,
};

export default rootReducer;
