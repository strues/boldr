/* @flow weak */
/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import Ripple from './Ripple';

type Props = {
  className: ?string,
  style: ?Object,
  displayCenter: ?boolean,
};

export default class TouchRipple extends React.Component<Props, *> {
  static defaultProps = {
    className: null,
    style: null,

    displayCenter: false,
  };

  constructor(props) {
    super(props);
    // $FlowIssue
    this.ignoreNextMouseDown = false;
    // $FlowIssue
    this.nextKey = 0;
    // $FlowIssue
    this.timeoutIds = [];
    this.state = {
      ripples: [],
    };
  }

  componentWillUnmount() {
    this.clearRippleTimeout();
  }

  props: Props;

  getDiag(a, b) {
    return Math.sqrt(a * a + b * b);
  }

  getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      // $FlowIssue
      offsetTop: rect.top + document.body.scrollTop,
      // $FlowIssue
      offsetLeft: rect.left + document.body.scrollLeft,
    };
  }

  getRippleStyle = e => {
    const { displayCenter } = this.props;

    const el = ReactDOM.findDOMNode(this);
    const elWidth = el.offsetWidth;
    const elHeight = el.offsetHeight;

    let pointerX, pointerY;
    if (displayCenter) {
      pointerX = elWidth / 2;
      pointerY = elHeight / 2;
    } else {
      const { offsetTop, offsetLeft } = this.getOffset(el);
      pointerX = e.pageX - offsetLeft;
      pointerY = e.pageY - offsetTop;
    }
    const rippleRadius = Math.max(
      this.getDiag(pointerX, pointerY),
      this.getDiag(elWidth - pointerX, pointerY),
      this.getDiag(elWidth - pointerX, elHeight - pointerY),
      this.getDiag(pointerX, elHeight - pointerY),
    );
    const rippleSize = rippleRadius * 2;

    const left = pointerX - rippleRadius;
    const top = pointerY - rippleRadius;

    return {
      height: rippleSize,
      width: rippleSize,
      top,
      left,
    };
  };

  addRipple(e: Event) {
    if (this.ignoreNextMouseDown) {
      return;
    }
    // $FlowIssue
    this.ignoreNextMouseDown = true;
    const { ripples } = this.state;
    ripples.push(<Ripple key={this.nextKey++} style={this.getRippleStyle(e)} />);
    this.setState(
      {
        ripples,
      },
      () => {
        // $FlowIssue
        this.ignoreNextMouseDown = false;
      },
    );
  }

  removeRipple() {
    this.clearRippleTimeout();
    this.setState({
      ripples: [],
    });
  }

  clearRippleTimeout = () => {
    if (!this.timeoutIds || this.timeoutIds.length < 1) {
      return;
    }
    this.timeoutIds.forEach(item => clearTimeout(item));
    this.timeoutIds = [];
  };

  mouseDownHandle = e => {
    this.timeoutIds[this.nextKey] = setTimeout(() => {
      this.removeRipple();
    }, 1000 / 60);

    this.addRipple(e);
  };

  mouseUpHandle = () => {
    this.removeRipple();
  };

  render() {
    const { className, style } = this.props;
    const { ripples } = this.state;

    return (
      <TransitionGroup
        component="div"
        className="touch-ripple"
        style={style}
        onMouseDown={this.mouseDownHandle}
        onMouseUp={this.mouseUpHandle}>
        {ripples && ripples.length > 0 ? ripples : null}
      </TransitionGroup>
    );
  }
}
