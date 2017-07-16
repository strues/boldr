/* @flow */
import { Component } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';
import PropTypes from 'prop-types';

export const SET_PATH = 'router/SET_PATH';
export const REPLACE_PATH = 'router/REPLACE_PATH';
export const RECOVER_PATH = '/pingback/';

const initialState = {};

/**
 * reducer for router that keeps track of the location
 * @param {Object} [state=initialState] initial router state is empty
 * @param {[type]} action [description]
 * @return {Object} the state of the router
 */
export function routerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PATH:
      return { ...state, path: action.path, replace: false };
    case REPLACE_PATH:
      return { ...state, path: action.path, replace: true };
    default:
      return state;
  }
}

/**
 * Sets the current path to the store
 * @param {String} path the browser location
 */
export function setPath(path) {
  return {
    type: SET_PATH,
    path,
  };
}

/**
 * Replaces the current location with the next path
 * @param {string} path the browser location
 */
export function replacePath(path) {
  return {
    type: REPLACE_PATH,
    path,
  };
}

export type Props = {
  location: ?Object,
  children: ReactChildren,
  path: ?string,
  replace: ?boolean,
  setPath: ?Function,
  recoverPath: ?Function,
};

class RouterConnection extends Component {
  static defaultProps = {
    recoverPath: RECOVER_PATH,
  };
  componentDidMount() {
    if (this.context.router.history.location.pathname === this.props.recoverPath) {
      this.context.router.history.replace(this.props.path);
    } else {
      this.props.setPath(this.props.location.pathname);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.path === nextProps.location.pathname) {
      return;
    }

    // Sync from Redux
    if (nextProps.path !== this.props.path) {
      if (nextProps.replace === true) {
        this.context.router.history.replace(nextProps.path);
      } else {
        this.context.router.history.push(nextProps.path);
      }
    }

    // Sync to Redux
    if (nextProps.location !== this.props.location) {
      this.props.setPath(nextProps.location.pathname);
    }
  }
  props: Props;
  render() {
    return this.props.children;
  }
}

function mapStateToProps(state) {
  return {
    path: state.router.path,
    replace: state.router.replace,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPath: path => dispatch(setPath(path)),
  };
}

RouterConnection.contextTypes = {
  router: PropTypes.object,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RouterConnection));
