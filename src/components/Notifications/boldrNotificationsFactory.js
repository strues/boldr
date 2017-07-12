import React, { Component } from 'react';
import { array, func, string, number } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideNotification, removeNotification } from '../../state/notifications/notifications';
import Container from './Container';
import NotificationContainer from './NotificationContainer';

export const defaultProps = {
  position: ['0', '0', '0', '0'],
  stackNextOn: 'top',
  animationDuration: 400,
  animationEasing: 'ease',
  dismissAfter: 160000,
};

export default function boldrContainerFactory(WrappedNotification) {
  const propTypes = {
    notifications: array.isRequired,
    hideNotification: func.isRequired,
    removeNotification: func.isRequired,
    position: array.isRequired,
    stackNextOn: string.isRequired,
    animationDuration: number.isRequired,
    animationEasing: string.isRequired,
    dismissAfter: number.isRequired,
    slideFromSide: string,
  };

  class Notifications extends Component {
    constructor(props) {
      super(props);
      this.handleHiding = this.handleHiding.bind(this);
    }
    handleHiding(uid) {
      this.props.hideNotification(uid);
      setTimeout(() => {
        this.props.removeNotification(uid);
      }, this.props.animationDuration);
    }
    render() {
      return (
        <Container
          position={this.props.position}
          stackNextOn={this.props.stackNextOn}
          animationDuration={this.props.animationDuration}
          animationEasing={this.props.animationEasing}
          slideFromSide={this.props.slideFromSide}
        >
          {this.props.notifications.map(notification =>
            <NotificationContainer
              animatedMargin={this.props.position[0] === 'auto' ? 'bottom' : 'top'}
              key={notification.uid}
              uid={notification.uid}
              animationDuration={this.props.animationDuration}
              animationEasing={this.props.animationEasing}
              slideFromSide={this.props.slideFromSide}
              dismissAfter={this.props.dismissAfter}
            >
              <WrappedNotification
                hideNotification={() => {
                  this.handleHiding(notification.uid);
                }}
                options={notification.options}
              />
            </NotificationContainer>,
          )}
        </Container>
      );
    }
  }

  Notifications.propTypes = propTypes;
  Notifications.defaultProps = defaultProps;

  return connect(
    ({ notifications }) => ({ notifications }),
    dispatch =>
      bindActionCreators(
        {
          hideNotification,
          removeNotification,
        },
        dispatch,
      ),
  )(Notifications);
}
