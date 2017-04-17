import {push} from 'react-router-redux';
import api from '../../../core/api';
import {getToken} from '../../../core/authentication/token';
import * as notif from '../../../core/constants';
import {notificationSend} from '../notifications/notifications';
import * as t from '../actionTypes';
import {editProfile} from '../users/actions';

const token = getToken();

/**
  * FETCH MEDIA ACTIONS
  * -------------------------
  * @exports fetchMedia
  *****************************************************************/

export const fetchAttachments = (axios: any): ThunkAction => (
  dispatch: Dispatch,
) => {
  dispatch({type: t.GET_ATTACHMENT_REQUEST});

  return axios
    .get('/api/v1/attachments')
    .then(res => {
      dispatch({
        type: t.GET_ATTACHMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: t.GET_ATTACHMENT_FAILURE,
        error: err,
      });
    });
};
/* istanbul ignore next */
export const fetchMedia = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any,
) => {
  /* istanbul ignore next */
  if (shouldFetchAttachments(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchAttachments(axios));
  }

  /* istanbul ignore next */
  return null;
};

function shouldFetchAttachments(state) {
  const attachments = state.attachments.files;
  if (!attachments.length) {
    return true;
  }
  if (attachments.length) {
    return false;
  }
  return attachments;
}
function fetchMediaStart() {
  return {
    type: t.GET_ATTACHMENT_REQUEST,
  };
}

function fetchMediaSuccess(response) {
  return {
    type: t.GET_ATTACHMENT_SUCCESS,
    payload: response.body,
  };
}

function fetchMediaFail(err) {
  return {
    type: t.GET_ATTACHMENT_FAILURE,
    error: err,
  };
}

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
    data.append('field', 'mediaType', 1);
    console.log(payload);
    return api
      .post('/api/v1/media', data)
      .then(res => {
        if (!res.status === 201) {
          dispatch(uploadFail(res));
          dispatch(notificationSend(notif.MSG_UPLOAD_ERROR));
        }
        dispatch(uploadSuccess(res));
        dispatch(notificationSend(notif.MSG_UPLOAD_SUCCESS));
      })
      .catch(err => {
        dispatch(uploadFail(err));
      });
  };
}

function beginUpload() {
  return {
    type: t.UPLOAD_ATTACHMENT_REQUEST,
  };
}

function uploadSuccess(res) {
  return {
    type: t.UPLOAD_ATTACHMENT_SUCCESS,
    payload: res.data,
  };
}

function uploadFail(err) {
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

export function uploadPostImage(payload) {
  return dispatch => {
    dispatch(beginUploadPostImage());
    const data = new FormData();
    data.append('payload.name', payload);
    return api
      .post('/api/v1/attachments', data)
      .then(res => {
        if (!res.status === 201) {
          dispatch(uploadPostImageFail(res));
          dispatch(notificationSend(notif.MSG_UPLOAD_ERROR));
        }
        dispatch(uploadPostImageSuccess(res));
        dispatch(notificationSend(notif.MSG_UPLOAD_SUCCESS));
      })
      .catch(err => {
        dispatch(uploadPostImageFail(err));
        dispatch(notificationSend(notif.MSG_UPLOAD_ERROR));
      });
  };
}

function beginUploadPostImage() {
  return {
    type: t.UPLOAD_POST_IMG_REQUEST,
  };
}

function uploadPostImageSuccess(res) {
  return {
    type: t.UPLOAD_POST_IMG_SUCCESS,
    payload: res.data,
  };
}

function uploadPostImageFail(err) {
  return {
    type: t.UPLOAD_POST_IMG_FAILURE,
    error: err,
  };
}

/**
  * UPLOAD FILE ACTIONS
  * -------------------------
  * @exports uploadFiles
  *****************************************************************/

export function deleteMedia(id) {
  return dispatch => {
    dispatch({
      type: t.DELETE_ATTACHMENT_REQUEST,
    });
    return api
      .delete(`/api/v1/attachments/${id}`)
      .then(res => {
        dispatch({
          type: t.DELETE_ATTACHMENT_SUCCESS,
          id,
        });
        dispatch(notificationSend(notif.MSG_FILE_REMOVED));
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
    dispatch(updateAttachmentReq());
    return api
      .put(`/api/v1/attachments/${attachmentData.id}`, attachmentData)
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
  return {type: t.UPDATE_ATTACHMENT_REQUEST};
};
const updateAttachmentSuccess = response => {
  return {type: t.UPDATE_ATTACHMENT_SUCCESS};
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

export function selectedFile(file: Object) {
  return {
    type: t.SELECT_FILE,
    file,
  };
}

export function selectFile(file) {
  return dispatch => {
    dispatch(selectedFile(file));
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
      .post('/api/v1/attachments', data)
      .then(res => {
        const userData = {
          id: res.data.user_id,
          profileImage: res.data.url,
        };
        dispatch({
          type: t.UPLOAD_PROFILE_IMG_SUCCESS,
          payload: res.data,
        });
        dispatch(editProfile(userData));
        dispatch(notificationSend(notif.MSG_UPLOAD_SUCCESS));
      })
      .catch(err => {
        dispatch({
          type: t.UPLOAD_PROFILE_IMG_FAILURE,
          error: err,
        });
        dispatch(notificationSend(notif.MSG_UPLOAD_ERROR));
      });
  };
}

export function uploadAvatarImage(payload) {
  return dispatch => {
    dispatch({type: t.UPLOAD_AVATAR_IMG_REQUEST});
    const data = new FormData();
    data.append('payload.name', payload);
    return api
      .post('/api/v1/attachments', data)
      .then(res => {
        const userData = {
          id: res.data.user_id,
          avatarUrl: res.data.url,
        };
        console.log('user', userData);
        dispatch(editProfile(userData));
        dispatch({
          type: t.UPLOAD_AVATAR_IMG_SUCCESS,
          payload: res.data,
        });
        dispatch(notificationSend(notif.MSG_UPLOAD_SUCCESS));
      })
      .catch(err => {
        dispatch({
          type: t.UPLOAD_AVATAR_IMG_FAILURE,
          error: err,
        });
        dispatch(notificationSend(notif.MSG_UPLOAD_ERROR));
      });
  };
}
