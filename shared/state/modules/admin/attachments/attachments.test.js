import attachmentReducer from './attachments';
import { GET_ATTACHMENT_REQUEST } from './constants';

describe('Attachment', () => {
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
