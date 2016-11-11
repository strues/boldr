import { GRID } from 'core/config/layouts';

export const CHANGE_LAYOUT = '@boldr/CHANGE_LAYOUT';

export function changeLayout(layout) {
  return {
    type: CHANGE_LAYOUT,
    payload: layout,
  };
}

const INITIAL_STATE = {
  loaded: false,
  layout: GRID,
};

function uiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_LAYOUT:
      return {
        ...state,
        layout: action.payload,
      };
    default:
      return state;
  }
}
export default uiReducer;
