import { GET_ATTACHMENT_REQUEST } from '../actionTypes';
import attachmentReducer from './reducer';

describe('Attachment', () => {
  test('Should return the initial state', () => {
    expect(
        attachmentReducer(undefined, {}),
      ).toEqual({
        loading: false,
        error: null,
        files: [],
        postImage: {},
        avatarImage: {},
        profileImage: {},
        currentFile: {},
      });
  });
});
