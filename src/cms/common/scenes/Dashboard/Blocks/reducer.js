import { combineReducers } from 'redux';
import * as api from 'core/services/api';
import { API_BLOCKS } from 'core/config/endpoints';
import { notificationSend } from 'state/dux/notifications';

const FETCH_BLOCKS_REQUEST = '@boldr/dashboard/FETCH_BLOCKS_REQUEST';
const FETCH_BLOCKS_SUCCESS = '@boldr/dashboard/FETCH_BLOCKS_SUCCESS';
const FETCH_BLOCKS_FAILURE = '@boldr/dashboard/FETCH_BLOCKS_FAILURE';


const INITIAL_STATE = {
  loaded: false,
  error: null,
  blocks: [],
};
/**
 * Blocks Reducer
 * @param  {Object} state       The initial state
 * @param  {Object} action      The action object
 */
export default function blocksReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FETCH_BLOCKS_SUCCESS:
      return {
        ...state,
        blocks: action.result,
      };

    default:
      return state;
  }
}

export function areBlocksLoaded(globalState) {
  return globalState.blocks && globalState.blocks.loaded;
}

export function fetchBlocks() {
  return {
    types: [FETCH_BLOCKS_REQUEST, FETCH_BLOCKS_SUCCESS, FETCH_BLOCKS_FAILURE],
    promise: (client) => client.get(`${API_BLOCKS}`),
  };
}
