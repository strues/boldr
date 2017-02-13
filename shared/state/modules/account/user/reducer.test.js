import { LOGIN_SUCCESS } from '../../actionTypes';
import userReducer from './reducer';

describe('User Reducer', () => {
  it('Should return the initial state', () => {
    expect(
        userReducer(undefined, {}),
      ).toEqual({
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        username: '',
        location: '',
        avatarUrl: '',
        website: '',
        bio: '',
        role: '',
        roleId: '',
      });
  });
});
