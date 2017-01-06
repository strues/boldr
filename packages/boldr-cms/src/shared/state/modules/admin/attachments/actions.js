import * as api from '../../../../core/api';
import { notificationSend } from '../../notifications/notifications';
import * as t from './constants';

const fetchMediaStart = () => {
  return { type: t.GET_ATTACHMENT_REQUEST };
};

export function fetchMediaSuccess(response) {
  return {
    type: t.GET_ATTACHMENT_SUCCESS,
    payload: response.body,
  };
}

export function fetchMediaFail(err) {
  return {
    type: t.GET_ATTACHMENT_FAILURE,
    error: err,
  };
}

export function fetchMedia() {
  return (dispatch) => {
    dispatch(fetchMediaStart());
    return api.getAllAttachments()
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
  return { type: t.UPLOAD_ATTACHMENT_REQUEST };
};

function uploadSuccess(response) {
  return {
    type: t.UPLOAD_ATTACHMENT_SUCCESS,
    payload: response.body,
  };
}

function uploadFail(err) {
  return {
    type: t.UPLOAD_ATTACHMENT_FAILURE,
    error: err,
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
const beginUploadPostImage = () => {
  return { type: t.UPLOAD_POST_IMG_REQUEST };
};

function uploadPostImageSuccess(response) {
  return {
    type: t.UPLOAD_POST_IMG_SUCCESS,
    payload: response.body,
  };
}

function uploadPostImageFail(err) {
  return {
    type: t.UPLOAD_POST_IMG_FAILURE,
    error: err,
  };
}

export function uploadPostImage(payload) {
  return (dispatch) => {
    dispatch(beginUploadPostImage());
    return api.doUpload(payload)
      .then(response => {
        if (response.status === 201) {
          dispatch(uploadPostImageSuccess(response));
        }
      })
      .catch(err => {
        dispatch(uploadPostImageFail(err));
      });
  };
}
const deleteMediaFail = (err) => ({
  type: t.DELETE_ATTACHMENT_FAILURE,
  error: err,
});

export function deleteMedia(id) {
  return (dispatch) => {
    dispatch({
      type: t.DELETE_ATTACHMENT_REQUEST,
    });
    return api.delAttachment(id)
      .then(response => {
        dispatch({
          type: t.DELETE_ATTACHMENT_SUCCESS,
          id,
        });
      })
      .catch(err => {
        dispatch(deleteMediaFail(err));
      });
  };
}
