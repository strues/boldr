import { push } from 'react-router-redux';
import { normalize, arrayOf, schema } from 'normalizr';
import api from '../../../core/api';

import * as notif from '../../../core/constants';
import { notificationSend } from '../notifications/notifications';
import { editProfile } from '../users/actions';
import { media as mediaSchema, arrayOfMedia } from './schema';
import * as t from './constants';

const API_PREFIX = '/api/v1';

/**s
  * FETCH MEDIA ACTIONS
  * -------------------------
  * @exports fetchMedia
  *****************************************************************/

export const fetchMedia = (axios: any): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: t.FETCH_MEDIAS_REQUEST });

  return axios
    .get(`${API_PREFIX}/media`)
    .then(res => {
      const medias = res.data;
      const normalizedMedia = normalize(medias, arrayOfMedia);
      dispatch({
        type: t.FETCH_MEDIAS_SUCCESS,
        payload: normalizedMedia,
      });
    })
    .catch(err => {
      dispatch({
        type: t.FETCH_MEDIAS_FAILURE,
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
    type: t.GET_MEDIA_REQUEST,
  };
}

function fetchMediaSuccess(normalizedMedia) {
  return {
    type: t.GET_MEDIA_SUCCESS,
    payload: normalizedMedia,
  };
}

function fetchMediaFail(err) {
  return {
    type: t.GET_MEDIA_FAILURE,
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
      type: t.SELECT_MEDIA,
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
      type: t.UPLOAD_MEDIA_REQUEST,
    });
    const data = new FormData();
    data.append('file', payload);
    return api
      .post(`${API_PREFIX}/media`, data)
      .then(res => {
        dispatch({
          type: t.UPLOAD_MEDIA_SUCCESS,
          payload: res.data,
        });
        dispatch(notificationSend(notif.MSG_UPLOAD_SUCCESS));
      })
      .catch(err => {
        dispatch({
          type: t.t.UPLOAD_ATTACHMENT_FAILURE,
          error: err,
        });
      });
  };
}

export function deleteMedia(id) {
  return dispatch => {
    dispatch({
      type: t.DELETE_MEDIA_REQUEST,
    });
    return api
      .delete(`${API_PREFIX}/media/${id}`)
      .then(res => {
        dispatch({
          type: t.DELETE_MEDIA_SUCCESS,
          id,
        });
        dispatch(notificationSend(notif.MSG_FILE_REMOVED));
      })
      .catch(err => {
        dispatch({
          type: t.DELETE_MEDIA_FAILURE,
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

export function editMedia(mediaData) {
  return (dispatch: Function) => {
    dispatch(editMediaReq());
    return api
      .put(`${API_PREFIX}/media/${mediaData.id}`, mediaData)
      .then(res => {
        const media = res.data;
        const normalizedMedia = normalize(media, mediaSchema);
        dispatch(editMediaSuccess(normalizedMedia));
        dispatch(
          notificationSend({
            message: 'Updated attachment.',
            kind: 'info',
            dismissAfter: 3000,
          }),
        );
      })
      .catch(err => {
        dispatch(errorUpdateAttachment(err));
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
const editMediaReq = () => {
  return { type: t.EDIT_MEDIA_REQUEST };
};
const editMediaSuccess = normalizedMedia => {
  return {
    type: t.EDIT_MEDIA_SUCCESS,
    payload: normalizedMedia,
  };
};
const errorEditMedia = err => {
  return {
    type: t.EDIT_MEDIA_FAILURE,
    error: err.message,
  };
};
