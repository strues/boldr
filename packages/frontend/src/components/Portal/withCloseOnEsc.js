import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

// Not exported in index.js. Provides an HOC component for ESC to close functionality, useful in some cases.

export default function withCloseOnEsc(Closable) {
  return class ESCToCloseWrapper extends Component {
    static propTypes = {
      visible: PropTypes.bool.isRequired,
      onClose: PropTypes.func.isRequired,
    };
    componentDidMount() {
      if (this.props.visible) {
        this.on();
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.visible !== this.props.visible) {
        if (nextProps.visible) {
          this.on();
        } else {
          this.off();
        }
      }
    }

    componentWillUnmount() {
      if (this.props.visible) {
        this.off();
      }
    }

    onKeyUp = evt => {
      if (evt.keyCode === 27) {
        this.props.onClose();
      }
    };

    on() {
      document.body.addEventListener('keyup', this.onKeyUp, true);
    }

    off() {
      document.body.removeEventListener('keyup', this.onKeyUp, true);
    }

    render() {
      const props = omit(this.props, ['onClose']);
      return <Closable {...props} />;
    }
  };
}
