/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';

type Props = {
  isAuthenticated: boolean,
};
// $FlowIssue
export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object,
    };

    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/');
      }
    }
    props: Props;
    render() {
      return <ComposedComponent { ...this.props } />;
    }
    }

  function mapStateToProps(state) {
    return { isAuthenticated: state.auth.isAuthenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
