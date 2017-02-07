/**
 * This module is responsible for generating the HTML page response for
 * the react application middleware.
 */
/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */

import React, { Children, PropTypes } from 'react';
import serialize from 'serialize-javascript';
import getConfig from '../../../config/get';
import { onlyIf, removeNil } from '../../../shared/core/utils';
import ClientConfigScript from '../../../config/ClientConfigScript';
import Html from '../../../shared/components/Html';
import getClientBundleEntryAssets from './getClientBundleEntryAssets';
// PRIVATES

function KeyedComponent({ children }) {
  return Children.only(children);
}

// Resolve the assets (js/css) for the client bundle's entry chunk.
const clientEntryAssets = getClientBundleEntryAssets();

function stylesheetTag(stylesheetFilePath) {
  return (
    <link
      href={ stylesheetFilePath }
      media="screen, projection"
      rel="stylesheet"
      type="text/css"
    />
  );
}
function scriptTag(jsFilePath) {
  return <script type="text/javascript" src={ jsFilePath } />;
}

// COMPONENT

function ServerHTML(props) {
  const {
    reactAppString,
    nonce,
    preloadedState,
    styles,
    helmet,
  } = props;

  // Creates an inline script definition that is protected by the nonce.
  const inlineScript = body => (
    <script
      nonce={ nonce }
      type="text/javascript"
      dangerouslySetInnerHTML={ { __html: body } }
    />
  );

  const headerElements = removeNil([
    ...onlyIf(helmet, () => helmet.meta.toComponent()),
    ...onlyIf(helmet, () => helmet.link.toComponent()),
    onlyIf(
      clientEntryAssets && clientEntryAssets.css,
      () => stylesheetTag(clientEntryAssets.css),
    ),
    ...onlyIf(helmet, () => helmet.style.toComponent()),
  ]);

  const bodyElements = removeNil([
    // Binds the client configuration object to the window object so
    // that we can safely expose some configuration values to the
    // client bundle that gets executed in the browser.
    <ClientConfigScript key="none" nonce={ nonce } />,
    inlineScript(`window.__PRELOADED_STATE__=${serialize(props.preloadedState)};`),
    onlyIf(
      getConfig('polyfillIO.enabled'),
      () => scriptTag(getConfig('polyfillIO.url')),
    ),
    onlyIf(
      process.env.NODE_ENV === 'development'
      && getConfig('bundles.client.devVendorDLL.enabled'),
      () => scriptTag(
        `${getConfig('bundles.client.webPath')}${getConfig('bundles.client.devVendorDLL.name')}.js?t=${Date.now()}`,
      ),
    ),
    onlyIf(
      clientEntryAssets && clientEntryAssets.js,
      () => scriptTag(clientEntryAssets.js),
    ),
    ...onlyIf(
      helmet,
      () => helmet.script.toComponent(),
    ),
  ]);

  return (
    <Html
      title={ getConfig('htmlPage.defaultTitle') }
      titleTemplate={ getConfig('htmlPage.titleTemplate') }
      description={ getConfig('htmlPage.description') }
      appBodyString={ reactAppString }
      headerElements={
        headerElements.map((x, idx) => <KeyedComponent key={ idx }>{x}</KeyedComponent>)
      }
      bodyElements={
        bodyElements.map((x, idx) => <KeyedComponent key={ idx }>{x}</KeyedComponent>)
      }
    />
  );
}

ServerHTML.propTypes = {
  reactAppString: PropTypes.string,
  nonce: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  helmet: PropTypes.object,
};

// EXPORT

export default ServerHTML;
