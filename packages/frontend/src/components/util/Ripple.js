/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default class Ripple extends Component {
  constructor(props) {
    super(props);

    this.hasMounted = false;
  }
  componentDidMount() {
    this.hasMounted = true;
  }

  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout);
  }
  componentWillAppear(callback) {
    this.initializeAnimation(callback);
  }

  componentWillEnter(callback) {
    this.initializeAnimation(callback);
  }

  componentDidAppear() {
    this.animate();
  }

  componentDidEnter() {
    this.animate();
  }

  componentWillLeave(callback) {
    ReactDOM.findDOMNode(this).style.opacity = 0;

    this.timeout = setTimeout(() => {
      this.hasMounted && callback();
    }, 2000);
  }
  initializeAnimation(callback) {
    ReactDOM.findDOMNode(this).style.transform = 'scale(0)';

    setTimeout(() => {
      this.hasMounted && callback();
    }, 0);
  }

  animate() {
    ReactDOM.findDOMNode(this).style.transform = 'scale(1)';
  }

  render() {
    const { className, style, children } = this.props;

    return (
      <div className={`ripple ${className}`} style={style}>
        {children}
      </div>
    );
  }
}

Ripple.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.object,
};

Ripple.defaultProps = {
  className: '',
  style: null,
};
