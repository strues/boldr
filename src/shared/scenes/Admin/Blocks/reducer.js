import * as api from '../../../core/api';
import { notificationSend } from '../../../state/modules/notifications/notifications';
import * as notif from '../../../core/constants';

const FETCH_BLOCKS_REQUEST = '@boldr/DASHBOARD/FETCH_BLOCKS_REQUEST';
const FETCH_BLOCKS_SUCCESS = '@boldr/DASHBOARD/FETCH_BLOCKS_SUCCESS';
const FETCH_BLOCKS_FAILURE = '@boldr/DASHBOARD/FETCH_BLOCKS_FAILURE';
const CREATE_BLOCK_REQUEST = '@boldr/DASHBOARD/CREATE_BLOCK_REQUEST';
const CREATE_BLOCK_SUCCESS = '@boldr/DASHBOARD/CREATE_BLOCK_SUCCESS';
const CREATE_BLOCK_FAILURE = '@boldr/DASHBOARD/CREATE_BLOCK_FAILURE';

export function fetchBlocks() {
  return (dispatch: Function) => {
    dispatch(requestBlocks());
    return api.getAllBlocks()
      .then(response => {
        dispatch(receiveBlocks(response));
      })
      .catch(err => {
        dispatch(receiveBlocksFailed(err));
      });
  };
}
const requestBlocks = () => {
  return { type: FETCH_BLOCKS_REQUEST };
};

const receiveBlocks = (response) => {
  return {
    type: FETCH_BLOCKS_SUCCESS,
    payload: response.body,
  };
};

const receiveBlocksFailed = (err) => ({
  type: FETCH_BLOCKS_FAILURE, error: err,
});

/**
  * CREATE BLOCK ACTIONS
  * -------------------------
  * @exports createBlock
  *****************************************************************/

/**
 * Create a new block takes the submitted form-data as data and
 * sends the information to the api.
 * @param  {Object} data        The data from the form / post editor
 * @return {Object}             Response object.
 */
export function createBlock(data) {
  return (dispatch) => {
    dispatch(beginCreateBlock());
    return api.doCreateBlock(data)
      .then(response => {
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
  loading: false,
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
        all: action.payload,
      };

    default:
      return state;
  }
}

export function areBlocksLoaded(globalState) {
  return globalState.blocks && globalState.blocks.loaded;
}
