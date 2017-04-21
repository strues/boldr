import React, { Component } from 'react';
import uuid from 'uuid';

const inline = {
  zIndex: '99999',
  boxSizing: 'border-box',
  width: '100%',
  padding: '1em',
  position: 'fixed',
  bottom: '2rem',
  backgroundColor: '#212121',
  color: 'rgb(250, 250, 250)',
  lineHeight: '16px',
  boxShadow: '0 0 1px 1px rgba(10, 10, 11, .125)',
  borderRadius: '3px',
  maxWidth: '320px',
  textRendering: 'optimizeLegibility',
  WebKittransition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
  MozTransition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
  msTransition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
  OTransition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
  transition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
  WebkitTransform: 'translatez(0)',
  MozTransform: 'translatez(0)',
  msTransform: 'translatez(0)',
  OTransform: 'translatez(0)',
  transform: 'translatez(0)',
};

type Props = {
  id?: string | number,
  message?: string,
  kind?: 'success' | 'info' | 'error' | 'danger',
  onActionClick?: Function,
  actionLabel?: string,
  dismissAfter: number,
  onDismiss: Function,
};

class Notification extends Component {
  constructor() {
    super();
    this._id = uuid.v4();
  }

  componentDidMount() {
    if (this.props.dismissAfter) {
      setTimeout(
        () => this.props.onDismiss(this.props.id),
        this.props.dismissAfter,
      );
    }
  }

  /**
   * @name _onActionClick
   * Handle click events on the notification
   * @return {function} returns a function you can call another action with.
   */
  _onActionClick = () => {
    if (this.props.onActionClick) {
      this.props.onActionClick(this.props.id);
    }
  };

  props: Props;
  render() {
    const { kind, actionLabel, message } = this.props;
    return (
      <div style={inline} className="boldrui-notification">
        <div className="boldrui-notification__icon" />
        <div className="boldrui-notification__content">
          <span className="boldrui-notification__message">
            {message}
          </span>
        </div>
        {actionLabel &&
          <span className="boldrui-notification__action">
            <button onClick={this._onActionClick}>
              {actionLabel}
            </button>
          </span>}
        <div className="boldrui-notification__close" />
      </div>
    );
  }
}

Notification.defaultProps = {
  kind: 'info',
};

export default Notification;
