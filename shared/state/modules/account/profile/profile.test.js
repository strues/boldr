
import profileReducer from './profile';

describe('Profile Reducer', () => {
  it('Should return the initial state', () => {
    expect(
        profileReducer(undefined, {}),
      ).toEqual({
        isFetching: false,
        current: {
          email: '',
          firstName: '',
          lastName: '',
          username: '',
          avatarUrl: '',
          profileImage: '',
          website: '',
          bio: '',
          role: '',
          roleId: '',
        },
      });
  });
});
