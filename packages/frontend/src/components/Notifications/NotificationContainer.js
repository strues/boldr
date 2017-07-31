/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideNotification, removeNotification } from '@boldr/core';
import Notification from './Notification';

export type Props = {
  uid: string,
  children: ReactChildren,
  hideNotification?: Function,
  removeNotification?: Function,
  animatedMargin?: string,
  isVisible: boolean,
  animationDuration: number,
  animationEasing: string,
  dismissAfter?: number,
  slideFromSide?: string,
  options: Object,
};

export class NotificationContainer extends Component {
  state = {
    height: 0,
  };
  componentDidMount() {
    this.setClientHeight();
    setTimeout(() => {
      this.props.hideNotification(this.props.uid);
    }, this.props.dismissAfter);
    setTimeout(() => {
      this.props.removeNotification(this.props.uid);
    }, this.props.dismissAfter + this.props.animationDuration);
  }
  setClientHeight = () => {
    this.setState({
      height: this.notification.clientHeight,
    });
  };

  props: Props;

  render() {
    return (
      <div
        ref={notification => {
          this.notification = notification;
        }}
      >
        <Notification
          animatedMargin={this.props.animatedMargin}
          notificationHeight={this.state.height}
          isVisible={this.props.isVisible}
          slideFromSide={this.props.slideFromSide}
          animationEasing={this.props.animationEasing}
          animationDuration={this.props.animationDuration}
        >
          {this.props.children}
        </Notification>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { isVisible, options } = state.boldr.notifications.find(
    notification => notification.uid === props.uid,
  );
  return {
    isVisible,
    options,
  };
}

export default connect(mapStateToProps, dispatch =>
  bindActionCreators(
    {
      hideNotification,
      removeNotification,
    },
    dispatch,
  ),
)(NotificationContainer);
