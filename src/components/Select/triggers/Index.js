/* @flow */
import PropTypes from 'prop-types';
/**
 * Trigger
 */

import React, { Component } from 'react';

export type Props = {
  trigger?: any,
  open?: boolean,
};

class Trigger extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: props.open,
    };
    this.triggerClickHandler = this.triggerClickHandler.bind(this);
  }

  props: Props;

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  triggerClickHandler() {
    let { open } = this.state;
    this.props.onChange({
      open: !open,
    });
  }

  render() {
    let Node = this.props.trigger;

    return <Node {...this.props} onClick={this.triggerClickHandler} />;
  }
}

Trigger.defaultProps = {
  open: false,
};

export default Trigger;
