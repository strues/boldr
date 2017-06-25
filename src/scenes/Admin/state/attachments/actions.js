/* @flow */
import { sendNotification } from '../../../../state/notifications/notifications';
import { editProfile } from '../../../../state/users/actions';
import { api, API_PREFIX } from '../../../../core';
import * as notif from '../../../../core/constants';

import * as t from '../actionTypes';

/**
  * UPLOAD FILE ACTIONS
  * -------------------------
  * @exports uploadFiles
  *****************************************************************/

export function uploadFiles(payload) {
  return dispatch => {
    dispatch(beginUpload());
    const data = new FormData();
    data.append('file', payload);
    return api
      .post(`${API_PREFIX}/attachments`, data)
      .then(res => {
        if (!res.status === 201) {
          dispatch(uploadFail(res));
          dispatch(sendNotification(notif.MSG_UPLOAD_ERROR));
        }
        dispatch(uploadSuccess(res));
        return dispatch(sendNotification(notif.MSG_UPLOAD_SUCCESS));
      })
      .catch(err => {
        dispatch(uploadFail(err));
      });
  };
}

function beginUpload() {
  /* istanbul ignore next */
  return {
    type: t.UPLOAD_ATTACHMENT_REQUEST,
  };
}

function uploadSuccess(res) {
  /* istanbul ignore next */
  return {
    type: t.UPLOAD_ATTACHMENT_SUCCESS,
    payload: res.data,
  };
}

function uploadFail(err) {
  /* istanbul ignore next */
  return {
    type: t.UPLOAD_ATTACHMENT_FAILURE,
    error: err,
  };
}

/**
  * UPLOAD FILE ACTIONS
  * -------------------------
  * @exports uploadFiles
  *****************************************************************/

export function uploadArticleImage(payload) {
  return dispatch => {
    dispatch(beginuploadArticleImage());
    const data = new FormData();
    data.append('payload.name', payload);
    return api
      .post(`${API_PREFIX}/media`, data)
      .then(res => {
        dispatch(uploadArticleImageSuccess(res));
        return dispatch(sendNotification(notif.MSG_UPLOAD_SUCCESS));
      })
      .catch(err => {
        dispatch(uploadArticleImageFail(err));
        dispatch(sendNotification(notif.MSG_UPLOAD_ERROR));
      });
  };
}

function beginuploadArticleImage() {
  return {
    type: t.UPLOAD_POST_IMG_REQUEST,
  };
}

function uploadArticleImageSuccess(res) {
  /* istanbul ignore next */
  return {
    type: t.UPLOAD_POST_IMG_SUCCESS,
    payload: res.data,
  };
}

function uploadArticleImageFail(err) {
  return {
    type: t.UPLOAD_POST_IMG_FAILURE,
    error: err,
  };
}

/**
  * DELETE FILE ACTIONS
  * -------------------------
  * @exports deleteAttachment
  *****************************************************************/

export function deleteAttachment(id) {
  return dispatch => {
    dispatch({
      type: t.DELETE_ATTACHMENT_REQUEST,
    });
    return api
      .delete(`${API_PREFIX}/attachments/${id}`)
      .then(res => {
        dispatch({
          type: t.DELETE_ATTACHMENT_SUCCESS,
          id,
        });
        return dispatch(sendNotification(notif.MSG_FILE_REMOVED));
      })
      .catch(err => {
        dispatch({
          type: t.DELETE_ATTACHMENT_FAILURE,
          error: err,
        });
      });
  };
}
/**
  * UPDATE FILE ACTIONS
  * -------------------------
  * @exports updateAttachment
  *****************************************************************/

export function updateAttachment(attachmentData) {
  return (dispatch: Function) => {
    dispatch({ type: t.UPDATE_ATTACHMENT_REQUEST });
    return api
      .put(`${API_PREFIX}/attachments/${attachmentData.id}`, attachmentData)
      .then(res => {
        dispatch(updateAttachmentSuccess(res));
        return dispatch(
          sendNotification({
            message: 'Updated attachment.',
            kind: 'info',
            dismissAfter: 3000,
          }),
        );
      })
      .catch(err => {
        dispatch(errorUpdateAttachment(err.message));
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

const updateAttachmentSuccess = response => {
  return { type: t.UPDATE_ATTACHMENT_SUCCESS };
};
const errorUpdateAttachment = err => {
  return {
    type: t.UPDATE_ATTACHMENT_FAILURE,
    error: err,
  };
};

/**
  * SELECT FILE ACTIONS
  * -------------------------
  * @exports updateAttachment
  *****************************************************************/

export function selectFile(file: Object) {
  return dispatch => {
    dispatch({
      type: t.SELECT_FILE,
      file,
    });
  };
}

/**
  * UPLOAD PROFILE ACTIONS
  * -------------------------
  * @exports uploadProfileImage
  * @exports uploadAvatarImage
  *****************************************************************/

export function uploadProfileImage(payload) {
  return dispatch => {
    dispatch({
      type: t.UPLOAD_PROFILE_IMG_REQUEST,
    });
    const data = new FormData();
    data.append('payload.name', payload);
    return api
      .post(`${API_PREFIX}/attachments`, data)
      .then(res => {
        const userData = {
          id: res.data.userId,
          profileImage: res.data.url,
        };
        dispatch({
          type: t.UPLOAD_PROFILE_IMG_SUCCESS,
          payload: res.data,
        });
        dispatch(editProfile(userData));
        return dispatch(sendNotification(notif.MSG_UPLOAD_SUCCESS));
      })
      .catch(err => {
        dispatch({
          type: t.UPLOAD_PROFILE_IMG_FAILURE,
          error: err,
        });
        dispatch(sendNotification(notif.MSG_UPLOAD_ERROR));
      });
  };
}

export function uploadAvatarImage(payload) {
  return dispatch => {
    dispatch({ type: t.UPLOAD_AVATAR_IMG_REQUEST });
    const data = new FormData();
    data.append('payload.name', payload);
    return api
      .post(`${API_PREFIX}/attachments`, data)
      .then(res => {
        const userData = {
          id: res.data.userId,
          avatarUrl: res.data.url,
        };
        dispatch(editProfile(userData));
        dispatch({
          type: t.UPLOAD_AVATAR_IMG_SUCCESS,
          payload: res.data,
        });
        return dispatch(sendNotification(notif.MSG_UPLOAD_SUCCESS));
      })
      .catch(err => {
        dispatch({
          type: t.UPLOAD_AVATAR_IMG_FAILURE,
          error: err,
        });
        dispatch(sendNotification(notif.MSG_UPLOAD_ERROR));
      });
  };
}
