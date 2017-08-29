/* @flow */
/* eslint-disable react/no-unused-prop-types */
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
type State = {
  height: number,
};
export class NotificationContainer extends Component<Props, State> {
  state = {
    height: 0,
  };
  state: State;
  componentDidMount() {
    this.setClientHeight();
    setTimeout(() => {
      // $FlowIssue
      this.props.hideNotification(this.props.uid);
    }, this.props.dismissAfter);
    setTimeout(() => {
      // $FlowIssue
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
          // $FlowIssue
          this.notification = notification;
        }}>
        <Notification
          animatedMargin={this.props.animatedMargin}
          notificationHeight={this.state.height}
          isVisible={this.props.isVisible}
          slideFromSide={this.props.slideFromSide}
          animationEasing={this.props.animationEasing}
          animationDuration={this.props.animationDuration}>
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
