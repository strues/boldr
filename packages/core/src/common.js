export { default as createBoldrStore } from './shared/createBoldrStore';
export { default as wrapBoldrApp } from './shared/wrapBoldrApp';
export { default as createApolloClient } from './shared/createApolloClient';
export { default as RouterConnection } from './shared/RouterConnection';
export { default as flattenRoutes } from './shared/flattenRoutes';
export {
  changeLayout,
  showModal,
  hideModal,
  setMobileDevice,
  showHideSidebar,
  expandCollapseSideMenu,
  hideHeader,
  showHeader,
} from './shared/boldr/ui/actions';
export { setPath, replacePath } from './shared/RouterConnection';
export {
  showNotification,
  hideNotification,
  removeNotification,
  hideAllNotifications,
  sendNotification,
  dismissNotification,
  clearNotification,
} from './shared/boldr/notifications/notifications';

export { default as validations } from './shared/validations';
