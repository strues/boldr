import { LOGIN_SUCCESS } from '../constants';
import userReducer from './user';

describe('Auth Duck', () => {
  it('Should return the initial state', () => {
    expect(
        userReducer(undefined, {}),
      ).toEqual({
        email: '',
        firstName: '',
        lastName: '',
        displayName: '',
        avatarUrl: '',
        role: '',
        roleId: '',
      });
  });
});
