import {push} from 'react-router-redux';
import {normalize, arrayOf, schema} from 'normalizr';
import api from '../../../core/api';

import * as notif from '../../../core/constants';
import {notificationSend} from '../notifications/notifications';
import * as t from '../actionTypes';
import {editProfile} from '../users/actions';
import {media as mediaSchema, arrayOfMedia} from './schema';

export const FETCH_MEDIAS_REQUEST = '@boldr/media/FETCH_MEDIAS_REQUEST';
export const FETCH_MEDIAS_SUCCESS = '@boldr/media/FETCH_MEDIAS_SUCCESS';
export const FETCH_MEDIAS_FAILURE = '@boldr/media/FETCH_MEDIAS_FAILURE';
export const GET_MEDIA_REQUEST = '@boldr/media/GET_MEDIA_REQUEST';
export const GET_MEDIA_SUCCESS = '@boldr/media/GET_MEDIA_SUCCESS';
export const GET_MEDIA_FAILURE = '@boldr/media/GET_MEDIA_FAILURE';
export const SELECT_MEDIA = '@boldr/media/SELECT_MEDIA';
export const UPLOAD_MEDIA_REQUEST = '@boldr/media/UPLOAD_MEDIA_REQUEST';
export const UPLOAD_MEDIA_SUCCESS = '@boldr/media/UPLOAD_MEDIA_SUCCESS';
export const UPLOAD_MEDIA_FAILURE = '@boldr/media/UPLOAD_MEDIA_FAILURE';
export const EDIT_MEDIA_REQUEST = '@boldr/media/EDIT_MEDIA_REQUEST';
export const EDIT_MEDIA_SUCCESS = '@boldr/media/EDIT_MEDIA_SUCCESS';
export const EDIT_MEDIA_FAILURE = '@boldr/media/EDIT_MEDIA_FAILURE';
export const DELETE_MEDIA_REQUEST = '@boldr/media/DELETE_MEDIA_REQUEST';
export const DELETE_MEDIA_SUCCESS = '@boldr/media/DELETE_MEDIA_SUCCESS';
export const DELETE_MEDIA_FAILURE = '@boldr/media/DELETE_MEDIA_FAILURE';

/**
  * FETCH MEDIA ACTIONS
  * -------------------------
  * @exports fetchMedia
  *****************************************************************/

export const fetchMedia = (axios: any): ThunkAction => (dispatch: Dispatch) => {
  dispatch({type: FETCH_MEDIAS_REQUEST});

  return axios
    .get('/api/v1/media')
    .then(res => {
      const medias = res.data;
      const normalizedMedia = normalize(medias, arrayOfMedia);
      dispatch({
        type: FETCH_MEDIAS_SUCCESS,
        payload: normalizedMedia,
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_MEDIAS_FAILURE,
        error: err,
      });
    });
};
/* istanbul ignore next */
export const fetchMediaIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any,
) => {
  /* istanbul ignore next */
  if (shouldFetchMedia(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchMedia(axios));
  }

  /* istanbul ignore next */
  return null;
};

function shouldFetchMedia(state) {
  const medias = state.media.ids;
  if (!medias.length) {
    return true;
  }

  return false;
}

function fetchMediaStart() {
  return {
    type: GET_MEDIA_REQUEST,
  };
}

function fetchMediaSuccess(normalizedMedia) {
  return {
    type: GET_MEDIA_SUCESS,
    payload: normalizedMedia,
  };
}

function fetchMediaFail(err) {
  return {
    type: GET_MEDIA_FAILURE,
    error: err,
  };
}
export const toggleMedia = filter => ({
  type: 'TOGGLE_MEDIA_TYPE',
  filter,
});

export function selectMedia(file: Object) {
  return dispatch => {
    dispatch({
      type: SELECT_MEDIA,
      file,
    });
  };
}

/**
  * UPLOAD MEDIA ACTIONS
  * -------------------------
  * @exports uploadMedia
  *****************************************************************/

export function uploadMedia(payload) {
  return dispatch => {
    dispatch({
      type: UPLOAD_MEDIA_REQUEST,
    });
    const data = new FormData();
    data.append('file', payload);
    return api
      .post('/api/v1/medias', data)
      .then(res => {
        dispatch({
          type: UPLOAD_MEDIA_SUCCESS,
          payload: res.data,
        });
        dispatch(notificationSend(notif.MSG_UPLOAD_SUCCESS));
      })
      .catch(err => {
        dispatch({
          type: t.UPLOAD_ATTACHMENT_FAILURE,
          error: err,
        });
      });
  };
}

export function deleteMedia(id) {
  return dispatch => {
    dispatch({
      type: DELETE_MEDIA_REQUEST,
    });
    return api
      .delete(`/api/v1/media/${id}`)
      .then(res => {
        dispatch({
          type: DELETE_MEDIA_SUCCESS,
          id,
        });
        dispatch(notificationSend(notif.MSG_FILE_REMOVED));
      })
      .catch(err => {
        dispatch({
          type: DELETE_MEDIA_FAILURE,
          error: err,
        });
      });
  };
}

/**
  * UPDATE MEDIA ACTIONS
  * -------------------------
  * @exports updateMedia
  *****************************************************************/

export function updateMedia(attachmentData) {
  return (dispatch: Function) => {
    dispatch(updateAttachmentReq());
    return api
      .put(`/api/v1/media/${attachmentData.id}`, attachmentData)
      .then(res => {
        dispatch(updateAttachmentSuccess(res));
        dispatch(
          notificationSend({
            message: 'Updated attachment.',
            kind: 'info',
            dismissAfter: 3000,
          }),
        );
      })
      .catch(err => {
        dispatch(errorUpdateAttachment(err.message));
        dispatch(
          notificationSend({
            message: 'There was a problem updating the attachment.',
            kind: 'error',
            dismissAfter: 3000,
          }),
        );
      });
  };
}
const updateAttachmentReq = () => {
  return {type: UPDATE_MEDIA_REQUEST};
};
const updateAttachmentSuccess = response => {
  return {type: UPDATE_MEDIA_SUCCESS};
};
const errorUpdateAttachment = err => {
  return {
    type: UPDATE_MEDIA_FAILURE,
    error: err,
  };
};
