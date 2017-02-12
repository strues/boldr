/* @flow */
import React, { Component } from 'react';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';

import { fetchTemplateResource } from '../../state/modules/boldr/templates/actions';
import { fetchMenusIfNeeded, getByLabel } from '../../state/modules/boldr/menu';
// import { fetchSettingsIfNeeded, getSettings } from '../../state/modules/boldr/settings';

type Props = {
  pathname: string,
  auth: Object,
  fetchSettingsIfNeeded: Function,
  dispatch: Function,
  location: Object,
  fetchPagesIfNeeded: Function,
  fetchMenusIfNeeded: Function,
  settings: Object
};

const mapStateToProps = (state) => {
  return {
    auth: state.account.auth,
    pathname: state.routing.locationBeforeTransitions.pathname,
  };
};

@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchMenusIfNeeded()),
})
@connect(mapStateToProps)
export default (ComposedComponent: any) => {
  class TemplateProvider extends Component {
    static childContextTypes = {
      dispatch: React.PropTypes.func,
      location: React.PropTypes.object,
    };
    getChildContext() {
      const { dispatch, location } = this.props;
      return { dispatch, location };
    }

    componentDidMount() {
      this.props.dispatch(fetchMenusIfNeeded());
    }
    props: Props;

    getPageURL() {
      return (typeof(window) !== 'undefined')
      ? window.location.href
      : `${this.props.pathname}`;
    }
    render() {
      return (<ComposedComponent { ...this.props } />);
    }
  }

  return TemplateProvider;
};
