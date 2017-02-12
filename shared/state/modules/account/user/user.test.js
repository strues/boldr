import { LOGIN_SUCCESS, LOGOUT_USER, CHECK_AUTH_SUCCESS } from '../constants';
import userReducer from './user';

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
  it('should remove the user data from state', () => {
    const initialState = {
      id: '123123-asbasdf',
      email: 'admin@boldr.io',
      firstName: 'boldr',
      lastName: 'boldr',
      username: 'boldr',
      location: 'boldr',
      avatarUrl: 'http://bodr.io',
      website: 'https://boldr.io',
      bio: 'boldr',
      role: 'Admin',
      roleId: '3',
    };
    const stateAfter = {
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
    };
    expect(
      userReducer(initialState, {
        type: LOGOUT_USER,
      }),
    ).toEqual(stateAfter);
  });
});
