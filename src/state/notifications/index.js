import reducer, {
  actions,
  types,
  addNotification,
  updateNotification,
  removeNotification,
  removeNotifications,
  sendNotification,
  dismissNotification,
  clearNotification,
} from './notifications';

export default reducer;

export { notificationReducer, sendNotification, dismissNotification, clearNotification };
