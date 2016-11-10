import { combineReducers } from 'redux';
import * as api from 'core/services/api';
import { API_BLOCKS } from 'core/config/endpoints';
import { notificationSend } from 'state/dux/notifications';
import * as notif from 'core/config/notifications';

const FETCH_BLOCKS_REQUEST = '@boldr/dashboard/FETCH_BLOCKS_REQUEST';
const FETCH_BLOCKS_SUCCESS = '@boldr/dashboard/FETCH_BLOCKS_SUCCESS';
const FETCH_BLOCKS_FAILURE = '@boldr/dashboard/FETCH_BLOCKS_FAILURE';
const CREATE_BLOCK_REQUEST = '@boldr/dashboard/CREATE_BLOCK_REQUEST';
const CREATE_BLOCK_SUCCESS = '@boldr/dashboard/CREATE_BLOCK_SUCCESS';
const CREATE_BLOCK_FAILURE = '@boldr/dashboard/CREATE_BLOCK_FAILURE';
/**
  * CREATE POST ACTIONS
  * -------------------------
  * @exports createPost
  *****************************************************************/

/**
 * Create a new post takes the submitted form-data as data and
 * sends the information to the api.
 * @param  {Object} data        The data from the form / post editor
 * @return {Object}             Response object.
 */
export function createBlock(data) {
  return (dispatch) => {
    dispatch(beginCreateBlock());
    return api.doCreateBlock(data)
      .then(response => {
        if (response.status !== 201) {
          dispatch(errorCreatingBlock(response));
        }
        dispatch(createBlockSuccess(response));
        dispatch(notificationSend(notif.MSG_CREATE_POST_SUCCESS));
      })
      .catch(err => {
        dispatch(errorCreatingBlock(err));
        dispatch(notificationSend(notif.MSG_CREATE_POST_FAILUREURE));
      });
  };
}

const beginCreateBlock = () => {
  return { type: CREATE_BLOCK_REQUEST };
};

const createBlockSuccess = (response: Object) => {
  return {
    type: CREATE_BLOCK_SUCCESS,
    payload: response.body,
  };
};

const errorCreatingBlock = (err) => {
  return {
    type: CREATE_BLOCK_FAILURE,
    error: err,
  };
};


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
        all: action.result,
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
