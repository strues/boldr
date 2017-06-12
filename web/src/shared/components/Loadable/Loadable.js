// @flow
/* eslint-disable camelcase, no-empty, prefer-destructuring */
import React from 'react';

type GenericComponent<Props> = Class<React.Component<{}, Props, mixed>>;
type LoadedComponent<Props> = GenericComponent<Props>;
type LoadingComponent = GenericComponent<{}>;

const SERVER_SIDE_REQUIRE_PATHS = new Set();
const WEBPACK_CHUNK_NAMES = new Set();
const WEBPACK_REQUIRE_WEAK_IDS = new Set();
// $FlowIssue
const isWebpack = typeof __webpack_require__ !== 'undefined';
const requireFn = isWebpack ? __webpack_require__ : module.require.bind(module);

const babelInterop = obj => {
  // $FlowIgnore
  return obj && obj.__esModule ? obj.default : obj;
};

const tryRequire = (resolveModuleFn: Function, pathOrId: string | number) => {
  try {
    // $FlowIgnore
    return resolveModuleFn(requireFn(pathOrId));
  } catch (err) {}
  return null;
};

type Options<Props> = {
  loader: () => Promise<LoadedComponent<Props>>,
  LoadingComponent: LoadingComponent,
  delay?: number,
  serverSideRequirePath?: string,
  webpackChunkName?: string,
  webpackRequireWeakId?: () => number,
  resolveModule?: (obj: Object) => LoadedComponent<Props>,
};

export default function Loadable<Props: {}, Err: Error>(opts: Options<Props>) {
  const loader = opts.loader;
  const LoadingComponent = opts.LoadingComponent;
  const delay = opts.delay || 200;
  const serverSideRequirePath = opts.serverSideRequirePath;
  const webpackChunkName = opts.webpackChunkName;
  const webpackRequireWeakId = opts.webpackRequireWeakId;
  const resolveModuleFn = opts.resolveModule
    ? opts.resolveModule
    : babelInterop;

  let isLoading = false;

  let outsideComponent = null;
  let outsidePromise = null;
  let outsideError = null;

  if (!isWebpack && serverSideRequirePath) {
    outsideComponent = tryRequire(resolveModuleFn, serverSideRequirePath);
  }

  const load = () => {
    if (!outsidePromise) {
      isLoading = true;
      outsidePromise = loader()
        .then(Component => {
          isLoading = false;
          outsideComponent = resolveModuleFn(Component);
        })
        .catch(error => {
          isLoading = false;
          outsideError = error;
        });
    }
    return outsidePromise;
  };

  return class Loadable extends React.Component<void, Props, *> {
    _timeout: number;
    _mounted: boolean;

    static preload() {
      load();
    }

    constructor(props: Props) {
      super(props);

      if (!outsideComponent && isWebpack && webpackRequireWeakId) {
        const weakId = webpackRequireWeakId();
        // $FlowIssue
        if (__webpack_modules__[weakId]) {
          // if it's not in webpack modules, we wont be able
          // to load it. If we attempt to, we mess up webpack's
          // internal state, so only tryRequire if it's already
          // in webpack modules.
          outsideComponent = tryRequire(resolveModuleFn, weakId);
        }
      }

      this.state = {
        error: outsideError,
        pastDelay: false,
        Component: outsideComponent,
      };
    }

    componentWillMount() {
      this._mounted = true;

      if (this.state.Component) {
        return;
      }

      this._timeout = setTimeout(() => {
        this.setState({ pastDelay: true });
      }, delay);

      load().then(() => {
        if (!this._mounted) {
          return;
        }
        clearTimeout(this._timeout);
        this.setState({
          error: outsideError,
          pastDelay: false,
          Component: outsideComponent,
        });
      });
    }

    componentWillUnmount() {
      this._mounted = false;
      clearTimeout(this._timeout);
    }

    render() {
      const { pastDelay, error, Component } = this.state;

      if (!isWebpack) {
        if (serverSideRequirePath) {
          SERVER_SIDE_REQUIRE_PATHS.add(serverSideRequirePath);
        }

        if (webpackChunkName) {
          WEBPACK_CHUNK_NAMES.add(webpackChunkName);
        }
      }

      if (isWebpack && webpackRequireWeakId) {
        WEBPACK_REQUIRE_WEAK_IDS.add(webpackRequireWeakId());
      }

      if (isLoading || error) {
        return (
          <LoadingComponent
            isLoading={isLoading}
            pastDelay={pastDelay}
            error={error}
          />
        );
      } else if (Component) {
        return <Component {...this.props} />;
      } else {
        return null;
      }
    }
  };
}

export function flushServerSideRequirePaths() {
  const arr = Array.from(SERVER_SIDE_REQUIRE_PATHS);
  SERVER_SIDE_REQUIRE_PATHS.clear();
  return arr;
}

export function flushWebpackChunkNames() {
  const arr = Array.from(WEBPACK_CHUNK_NAMES);
  WEBPACK_CHUNK_NAMES.clear();
  return arr;
}

export function flushWebpackRequireWeakIds() {
  const arr = Array.from(WEBPACK_REQUIRE_WEAK_IDS);
  WEBPACK_REQUIRE_WEAK_IDS.clear();
  return arr;
}
