/* @flow */
import api, { API_PREFIX } from '~core/api';
import * as notif from '~core/constants';
import { sendNotification } from '~state/modules/notifications/notifications';
import * as t from './actionTypes';

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

export function uploadMediaFile(payload) {
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
          payload: newMedia,
        });
        return dispatch(sendNotification(notif.MSG_UPLOAD_SUCCESS));
      })
      .catch(err => {
        dispatch({
          type: t.UPLOAD_MEDIA_FAILURE,
          error: err,
        });
      });
  };
}

export function uploadMediaUrl(payload) {
  return dispatch => {
    dispatch({
      type: t.UPLOAD_MEDIA_REQUEST,
    });
    const data = payload;
    return api
      .post(`${API_PREFIX}/media/remote`, data)
      .then(res => {
        const newMedia = res.data;
        dispatch({
          type: t.UPLOAD_MEDIA_SUCCESS,
          payload: newMedia,
        });
        return dispatch(sendNotification(notif.MSG_UPLOAD_SUCCESS));
      })
      .catch(err => {
        dispatch({
          type: t.UPLOAD_MEDIA_FAILURE,
          error: err,
        });
      });
  };
}

export function deleteMedia(m) {
  const { id } = m;
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
        return dispatch(sendNotification(notif.MSG_FILE_REMOVED));
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
        dispatch(editMediaSuccess(media));
        return dispatch(
          sendNotification({
            message: 'Updated attachment.',
            kind: 'info',
            dismissAfter: 3000,
          }),
        );
      })
      .catch(err => {
        dispatch(errorEditMedia(err));
        dispatch(
          sendNotification({
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
const editMediaSuccess = media => {
  return {
    type: t.EDIT_MEDIA_SUCCESS,
    payload: media,
  };
};
const errorEditMedia = err => {
  return {
    type: t.EDIT_MEDIA_FAILURE,
    error: err.message,
  };
};

export const setMedia = data => {
  return {
    type: t.SET_MEDIA,
    data,
  };
};
