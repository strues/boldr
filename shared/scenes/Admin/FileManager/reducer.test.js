import attachmentReducer from './reducer';
import { GET_ATTACHMENT_REQUEST } from './constants';

describe('Attachment Reducer', () => {
  test('Should return the initial state', () => {
    expect(
        attachmentReducer(undefined, {}),
      ).toEqual({
        loading: false,
        error: null,
        files: [],
        postImage: {},
        currentFile: {},
      });
  });
});
