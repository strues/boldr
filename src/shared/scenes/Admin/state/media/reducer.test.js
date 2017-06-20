import attachmentReducer from './reducer';

describe('Attachment', () => {
  test('Should return the initial state', () => {
    expect(attachmentReducer(undefined, {})).toEqual({
      all: {},
      ids: [],
      isFetching: false,
      currentMedia: { uploadMedia: { name: '' } },
    });
  });
});
