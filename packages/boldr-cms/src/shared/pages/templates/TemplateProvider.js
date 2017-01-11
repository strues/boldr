/* @flow */
import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { provideHooks } from 'redial';
import debounce from 'lodash/debounce';
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
  fetch: ({ dispatch }) => Promise.all([
    dispatch(fetchMenusIfNeeded()),
    // dispatch(fetchTemplateResource()),
  ]),
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
      // const resource = this.props.pathname.replace(/[/]/, '');
      this.props.dispatch(fetchMenusIfNeeded());
      // this.props.dispatch(fetchTemplateResource(resource));
    }
    // $FlowIssue
    shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
    }
    props: Props;

    getPageURL() {
      return (typeof(window) !== 'undefined')
      ? window.location.href
      : `http://localhost:3000/${this.props.pathname}`;
    }
    render() {
      return (<ComposedComponent { ...this.props } url={ this.getPageURL() } />);
    }
  }

  return TemplateProvider;
};
