export { default as wrapBoldrApp } from './shared/wrapBoldrApp';

export { getToken, parseJWT, setToken, removeToken } from './shared/token';
export { default as createApolloClient } from './shared/apollo/createApolloClient';
export { default as flattenRoutes } from './util/flattenRoutes';
export { default as validations } from './util/validations';
export { default as createBoldrStore } from './shared/state/createBoldrStore';
export {
  changeLayout,
  toggleModal,
  setMobileDevice,
  toggleDrawer,
  toggleCollapse,
} from './shared/state/boldr/ui/actions';

export {
  hideNotification,
  removeNotification,
  sendNotification,
  clearNotifications,
} from './shared/state/boldr/notifications/actions';

export { default as createHistory } from './shared/history';

export { boldrReducer } from './shared/state/boldr';
