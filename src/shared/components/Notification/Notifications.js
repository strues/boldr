import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {
  dismissNotification,
} from '../../state/modules/notifications/notifications';

import Notification from './Notification';

const getProp = (obj, propName) =>
  (obj.get ? obj.get(propName) : obj[propName]); // eslint-disable-line

type Props = {
  notifications?: Array<Object>,
  className?: string,
  transitionEnterTimeout?: number,
  transitionLeaveTimeout?: number,
  dismissAfter: number,
  onActionClick?: Function,
  dismissNotification: Function,
  actionLabel?: string,
  CustomComponent: ReactElement,
};

export class Notifications extends PureComponent {
  static defaultProps = {
    className: null,
    onActionClick: null,
    action: null,
    transitionEnterTimeout: 140,
    transitionLeaveTimeout: 600,
    dismissAfter: 3000,
  };

  props: Props;

  _onDismiss = id => {
    this.props.dismissNotification(id);
  };

  render() {
    const {
      notifications,
      className,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      onActionClick,
      actionLabel,
      dismissAfter,
    } = this.props;

    const renderedNotifications = notifications.map(notification => (
      <Notification
        componentClassName="boldrui-notification"
        dismissAfter={notification.dismissAfter || dismissAfter}
        onDismiss={this._onDismiss}
        onActionClick={onActionClick}
        actionLabel={actionLabel}
        key={getProp(notification, 'id')}
        id={getProp(notification, 'id')}
        message={getProp(notification, 'message')}
        kind={getProp(notification, 'kind')}
      />
    ));
    const classes = ['boldrui-notification__container', className || null]
      .join(' ')
      .split();

    return (
      <div className={classes}>
        <CSSTransitionGroup
          transitionName={'boldrui-notification__transition'}
          transitionEnterTimeout={transitionEnterTimeout}
          transitionLeaveTimeout={transitionLeaveTimeout}
        >
          {renderedNotifications}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default connect(
  state => ({
    notifications: state.notifications,
  }),
  { dismissNotification },
)(Notifications);
