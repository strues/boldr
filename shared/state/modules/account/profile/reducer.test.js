
import profileReducer from './reducer';

describe('Profile Reducer', () => {
  it('Should return the initial state', () => {
    expect(
        profileReducer(undefined, {}),
      ).toEqual({
        isFetching: false,
        current: {
          id: '',
          email: '',
          firstName: '',
          lastName: '',
          username: '',
          location: '',
          avatarUrl: '',
          profileImage: '',
          social: {},
          website: '',
          bio: '',
          role: '',
          roleId: '',
        },
      });
  });
});
