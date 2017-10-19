/* @flow */
import * as t from './actionTypes';

export const toggleMedia = (filter: string) => ({
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

export const setMedia = (data: Object) => {
  return {
    type: t.SET_MEDIA,
    data,
  };
};
