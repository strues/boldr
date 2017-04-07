/* eslint-disable react/no-danger, react/no-array-index-key, react/jsx-key */

import React, { Children, PropTypes } from 'react';
import serialize from 'serialize-javascript';
import { ifElse, removeNil } from 'boldr-utils';
import ClientConfig from '../../../../config/components/ClientConfig';
import Html from '../../../shared/components/Html';
import getClientBundleEntryAssets from './getClientBundleEntryAssets';

function KeyedComponent({ children }) {
  return Children.only(children);
}

// Resolve the assets (js/css) for the client bundle's entry chunk.
const clientEntryAssets = getClientBundleEntryAssets();

function stylesheetTag(stylesheetFilePath) {
  return <link href={ stylesheetFilePath } media="screen, projection" rel="stylesheet" type="text/css" />;
}
function scriptTag(jsFilePath) {
  return <script type="text/javascript" src={ jsFilePath } />;
}

function ServerHTML(props) {
  const {
    reactAppString,
    nonce,
    preloadedState,
    styles,
    helmet,
  } = props;

  // Creates an inline script definition that is protected by the nonce.
  const inlineScript = body => <script nonce={nonce} type="text/javascript" dangerouslySetInnerHTML={{__html: body}} />; // eslint-disable-line

  const headerElements = removeNil([
    ...ifElse(helmet)(() => helmet.title.toComponent(), []),
    ...ifElse(helmet)(() => helmet.base.toComponent(), []),
    ...ifElse(helmet)(() => helmet.meta.toComponent(), []),
    ...ifElse(helmet)(() => helmet.link.toComponent(), []),
    ifElse(clientEntryAssets && clientEntryAssets.css)(() => stylesheetTag(clientEntryAssets.css)),
    ...ifElse(helmet)(() => helmet.style.toComponent(), []),
  ]);

  const bodyElements = removeNil([
    // Binds the client configuration object to the window object so
    // that we can safely expose some configuration values to the
    // client bundle that gets executed in the browser.
    <ClientConfig nonce={ nonce } />,
    inlineScript(`window.__PRELOADED_STATE__=${serialize(props.preloadedState)};`),
    scriptTag('https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Symbol'),
    ifElse(process.env.BUILD_FLAG_IS_DEV)(() => scriptTag(`/assets/__dev_vendor_dll__.js?t=${Date.now()}`)),
    ifElse(clientEntryAssets && clientEntryAssets.js)(() => scriptTag(clientEntryAssets.js)),
    ...ifElse(helmet)(() => helmet.script.toComponent(), []),
  ]);

  return (
    <Html
      htmlAttributes={ ifElse(helmet)(() => helmet.htmlAttributes.toComponent(), null) }
      headerElements={ headerElements.map((x, idx) => <KeyedComponent key={ idx }>{x}</KeyedComponent>) }
      bodyElements={ bodyElements.map((x, idx) => <KeyedComponent key={ idx }>{x}</KeyedComponent>) }
      appBodyString={ reactAppString }
    />
  );
}

ServerHTML.propTypes = {
  reactAppString: PropTypes.string,
  nonce: PropTypes.string,
  preloadedState: PropTypes.object,
  styles: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  helmet: PropTypes.object,
};

export default ServerHTML;
