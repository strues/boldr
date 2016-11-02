import React, { Component } from 'react';
import { connect } from 'react-redux';
import TransitionGroup from 'react-addons-css-transition-group';
import { notificationDismiss } from 'state/dux/notifications';
import Notification from './Notification';

const getter = (obj, propName) => (obj.get ? obj.get(propName) : obj[propName]);

class Notifications extends Component {
  constructor() {
    super();
    this._onDismiss = this._onDismiss.bind(this);
  }

  _onDismiss(id) {
    this.props.notificationDismiss(id);
  }

  render() {
    const {
      notifications,
      className,
      componentClassName,
      CustomComponent,
      transitionEnterTimeout, transitionLeaveTimeout, onActionClick, actionLabel, dismissAfter
    } = this.props;

    const renderedNotifications = notifications.map((notification) => (
    <Notification
      componentClassName="notification"
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
    const classes = [
      'notification__container',
      className || null
    ].join(' ').split();

    return (
    <div className={ classes } >
      <TransitionGroup
        transitionName={ 'notification-transition' }
        transitionEnterTimeout={ transitionEnterTimeout }
        transitionLeaveTimeout={ transitionLeaveTimeout }
      >
        { renderedNotifications }
      </TransitionGroup>
    </div>
    );
  }
}

Notifications.defaultProps = {
  className: null,
  transitionEnterTimeout: 600,
  transitionLeaveTimeout: 600
};

Notifications.propTypes = {
  notifications: React.PropTypes.array,
  className: React.PropTypes.string,
  transitionEnterTimeout: React.PropTypes.number,
  transitionLeaveTimeout: React.PropTypes.number,
  onActionClick: React.PropTypes.func,
  actionLabel: React.PropTypes.string
};

export default connect((state) => ({
  notifications: state.get ? state.get('notifications') : state.notifications
}), { notificationDismiss })(Notifications);
