import * as api from 'core/services/api';
import { notificationSend } from 'state/dux/notifications';

const DELETE_ATTACHMENT_REQUEST = 'DELETE_ATTACHMENT_REQUEST';
const DELETE_ATTACHMENT_SUCCESS = 'DELETE_ATTACHMENT_SUCCESS';
const DELETE_ATTACHMENT_FAILURE = 'DELETE_ATTACHMENT_FAILURE';
const GET_ATTACHMENT_REQUEST = 'GET_ATTACHMENT_REQUEST';
const GET_ATTACHMENT_SUCCESS = 'GET_ATTACHMENT_SUCCESS';
const GET_ATTACHMENT_FAILURE = 'GET_ATTACHMENT_FAILURE';
const UPLOAD_ATTACHMENT_REQUEST = 'UPLOAD_ATTACHMENT_REQUEST';
const UPLOAD_ATTACHMENT_SUCCESS = 'UPLOAD_ATTACHMENT_SUCCESS';
const UPLOAD_ATTACHMENT_FAILURE = 'UPLOAD_ATTACHMENT_FAILURE';

const fetchMediaStart = () => {
  return { type: GET_ATTACHMENT_REQUEST };
};

export function fetchMediaSuccess(response) {
  return {
    type: GET_ATTACHMENT_SUCCESS,
    payload: response.body
  };
}

export function fetchMediaFail(err) {
  return {
    type: GET_ATTACHMENT_FAILURE,
    error: err
  };
}

export function fetchMedia() {
  return (dispatch) => {
    dispatch(fetchMediaStart());
    return api.doFetchMedia()
      .then(response => {
        if (response.status !== 200) {
          dispatch(fetchMediaFail());
        }
        dispatch(fetchMediaSuccess(response));
      })
      .catch(err => {
        dispatch(fetchMediaFail(err));
      });
  };
}

const beginUpload = () => {
  return { type: UPLOAD_ATTACHMENT_REQUEST };
};

function uploadSuccess(response) {
  return {
    type: UPLOAD_ATTACHMENT_SUCCESS,
    payload: response.body
  };
}

function uploadFail(err) {
  return {
    type: UPLOAD_ATTACHMENT_FAILURE,
    error: err
  };
}

export function uploadFiles(payload) {
  return (dispatch) => {
    dispatch(beginUpload());
    return api.doUpload(payload)
      .then(response => {
        if (response.status === 201) {
          dispatch(uploadSuccess(response));
        }
      })
      .catch(err => {
        dispatch(uploadFail(err));
      });
  };
}

const deleteMediaFail = (err) => ({
  type: DELETE_ATTACHMENT_FAILURE,
  error: err
});

export function deleteMedia(id) {
  return (dispatch) => {
    dispatch({
      type: DELETE_ATTACHMENT_REQUEST
    });
    return api.doRemoveMedia(id)
      .then(response => {
        dispatch({
          type: DELETE_ATTACHMENT_SUCCESS,
          id
        });
      })
      .catch(err => {
        dispatch(deleteMediaFail(err));
      });
  };
}

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  files: []
};
/**
 * Attaachment Reducer
 * @param  {Object} state       The initial state
 * @param  {Object} action      The action object
 */
export default function attachmentReducer(state = INITIAL_STATE, action = {}) {
  if (!state.hydrated) {
    state = Object.assign({}, INITIAL_STATE, state, { hydrated: true });
  }
  switch (action.type) {
    case GET_ATTACHMENT_REQUEST:
    case UPLOAD_ATTACHMENT_REQUEST:
    case DELETE_ATTACHMENT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_ATTACHMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        files: action.payload
      };
    case UPLOAD_ATTACHMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        files: [...state.files, ...action.payload]
      };
    case DELETE_ATTACHMENT_SUCCESS:
      return {
        ...state,
        files: [...state.files].filter((file) => file.id !== action.id)
      };
    case GET_ATTACHMENT_FAILURE:
    case UPLOAD_ATTACHMENT_FAILURE:
    case DELETE_ATTACHMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
