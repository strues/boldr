import React, { Component } from 'react';
import { connect } from 'react-redux';
import TransitionGroup from 'react-addons-css-transition-group';
import { notificationDismiss } from '../../state/modules/notifications/notifications';

import Notification from './Notification';

const getter = (obj, propName) => obj.get ? obj.get(propName) : obj[propName]; // eslint-disable-line

type Props = {
  notifications?: Array<any>,
  className?: string,
  transitionEnterTimeout?: number,
  transitionLeaveTimeout?: number,
  dismissAfter: number,
  onActionClick?: Function,
  notificationDismiss: Function,
  actionLabel?: string,
  componentClassName: string,
  CustomComponent: ReactElement,
};

export class Notifications extends Component {
  constructor() {
    super();
    this._onDismiss = this._onDismiss.bind(this);
  }

  props: Props;

  _onDismiss(id) {
    this.props.notificationDismiss(id);
  }

  render() {
    const {
      notifications,
      className,
      componentClassName,
      CustomComponent,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      onActionClick,
      actionLabel,
      dismissAfter,
    } = this.props;

    const renderedNotifications = notifications.map(notification => (
      <Notification
        componentClassName="boldr-notification"
        dismissAfter={ notification.dismissAfter || dismissAfter }
        onDismiss={ this._onDismiss }
        onActionClick={ onActionClick }
        actionLabel={ actionLabel }
        key={ getter(notification, 'id') }
        id={ getter(notification, 'id') }
        message={ getter(notification, 'message') }
        kind={ getter(notification, 'kind') }
      />
    ));
    const classes = ['boldr-notification__container', className || null].join(' ').split();

    return (
      <div className={ classes }>
        <TransitionGroup
          transitionName={ 'boldr-notification__transition' }
          transitionEnterTimeout={ transitionEnterTimeout }
          transitionLeaveTimeout={ transitionLeaveTimeout }
        >
          {renderedNotifications}
        </TransitionGroup>
      </div>
    );
  }
}

Notifications.defaultProps = {
  className: null,
  transitionEnterTimeout: 600,
  transitionLeaveTimeout: 600,
};

export default connect(
  state => ({
    notifications: state.notifications,
  }),
  { notificationDismiss },
)(Notifications);
