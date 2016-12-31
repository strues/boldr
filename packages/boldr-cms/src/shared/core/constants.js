export const TOKEN_KEY = 'token';

export const LAYOUTS = {
  GALLERY: 'gallery',
  GRID: 'grid',
  LIST: 'list',
};

export const DEFAULT_STATUS = 'default';
export const INFO_STATUS = 'info';
export const SUCCESS_STATUS = 'success';
export const WARNING_STATUS = 'warning';
export const ERROR_STATUS = 'error';

export const STATUS = {
  default: DEFAULT_STATUS,
  info: INFO_STATUS,
  success: SUCCESS_STATUS,
  warning: WARNING_STATUS,
  error: ERROR_STATUS,
};

export const TOP = 't';
export const TOP_CENTER = 'tc';
export const TOP_LEFT_POSITION = 'tl';
export const TOP_RIGHT_POSITION = 'tr';
export const BOTTOM = 'b';
export const BOTTOM_CENTER = 'bc';
export const BOTTOM_LEFT_POSITION = 'bl';
export const BOTTOM_RIGHT_POSITION = 'br';

export const POSITIONS = {
  top: TOP,
  topCenter: TOP_CENTER,
  topLeft: TOP_LEFT_POSITION,
  topRight: TOP_RIGHT_POSITION,
  bottom: BOTTOM,
  bottomCenter: BOTTOM_CENTER,
  bottomLeft: BOTTOM_LEFT_POSITION,
  bottomRight: BOTTOM_RIGHT_POSITION,
};

export const MSG_SIGNUP_ERROR = {
  message: 'There was a problem creating your account.', kind: 'error', dismissAfter: 3000,
};

export const MSG_SIGNUP_SUCCESS = {
  message: 'Your account has been created!', kind: 'success', dismissAfter: 3000,
};

export const MSG_LOGIN_ERROR = (err) => {
  return {
    message: `There was a problem logging in to your account: ${err}`, kind: 'error', dismissAfter: 3000,
  };
};

export const MSG_LOGIN_SUCCESS = {
  message: 'Welcome back!', kind: 'success', dismissAfter: 3000,
};

export const MSG_LOGOUT = {
  message: 'You are now logged out of your account.', kind: 'info', dismissAfter: 3000,
};

export const MSG_AUTH_ERROR = {
  message: 'There was a problem authenticating. Please login again.', kind: 'error', dismissAfter: 3000,
};

export const MSG_FORGOT_PW_ERROR = {
  message: 'An email has been sent with instructions to reset your password', kind: 'error', dismissAfter: 3000,
};

export const MSG_RESET_PW_SUCCESS = {
  message: 'Your password has been reset. You may now login with it.', kind: 'success', dismissAfter: 3000,
};

export const MSG_UPDATE_MEMBER_ERROR = {
  message: 'There was a problem updating the user.', kind: 'error', dismissAfter: 3000,
};

export const MSG_UPDATE_MEMBER_SUCCESS = {
  message: 'Updated the user successfully.', kind: 'success', dismissAfter: 3000,
};

export const MSG_UPDATE_LINK_ERROR = {
  message: 'There was a problem updating the navigation link.', kind: 'error', dismissAfter: 3000,
};

export const MSG_UPDATE_LINK_SUCCESS = {
  message: 'Link updated.', kind: 'success', dismissAfter: 3000,
};

export const MSG_ADD_LINK_ERROR = {
  message: 'There was a problem creating a new link.', kind: 'error', dismissAfter: 3000,
};

export const MSG_ADD_LINK_SUCCESS = {
  message: 'Link added.', kind: 'success', dismissAfter: 3000,
};

export const MSG_CREATE_POST_SUCCESS = {
  message: 'Your post was created.', kind: 'success', dismissAfter: 3000,
};

export const MSG_CREATE_POST_FAILUREURE = {
  message: 'There was a problem creating your post', kind: 'error', dismissAfter: 3000,
};
