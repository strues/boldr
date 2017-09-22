// @flow
import type { Store as ReduxStore } from 'redux';

export type LayoutOpts = 'grid' | 'list' | 'gallery';
export type NotificationPayload = {
  uid?: string,
  type?: string,
  text?: string,
};

export type UiState = {
  layout?: LayoutOpts,
  isExpanded?: boolean,
  isMobile?: boolean,
  isDrawerOpen?: boolean,
  isModalVisible?: boolean,
};

export type Notification = {
  uid?: string,
  isVisible?: boolean,
  options?: NotificationPayload,
};

export type NotificationsState = Array<Notification>;

export type BoldrReducer = {
  ui: UiState,
  settings: any,
  notifications: NotificationsState,
};

export type Action =
  | { type: '@boldr/ui/CHANGE_LAYOUT', layout: LayoutOpts }
  | { type: '@boldr/ui/SET_MOBILE_DEVICE', enabled: boolean }
  | { type: '@boldr/ui/TOGGLE_COLLAPSE' }
  | { type: '@boldr/ui/TOGGLE_MODAL' }
  | { type: '@boldr/ui/TOGGLE_DRAWER' }
  | { type: '@boldr/notifications/SEND_NOTIFICATION', options: NotificationPayload }
  | { type: '@boldr/notifications/CLEAR_NOTIFICATIONS' }
  | { type: '@boldr/notifications/HIDE_NOTIFICATION', uid: string }
  | { type: '@boldr/notifications/REMOVE_NOTIFICATION', uid: string };

export type BoldrStore = ReduxStore<BoldrReducer, Action>;
// eslint-disable-next-line no-use-before-define
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
