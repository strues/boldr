/* @flow */
import React, { Component } from 'react';

type Props = {
  mountTrigger?: boolean,
  children: ReactChildren,
};

export default class LazyMount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: props.mountTrigger,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { mountTrigger } = nextProps;
    const { mounted } = this.state;
    if (mountTrigger && !mounted) {
      this.setState({
        mounted: true,
      });
    }
  }
  props: Props;
  render() {
    const { children } = this.props;
    const { mounted } = this.state;
    if (mounted) {
      return children;
    }
    return null;
  }
}
