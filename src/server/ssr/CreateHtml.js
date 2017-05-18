/* @flow */
/* eslint-disable react/no-danger, react/no-array-index-key, react/jsx-key */
import React, { Children } from 'react';
import serialize from 'serialize-javascript';
import { ifElse, removeNil } from 'boldr-utils';
import uuid from 'uuid/v4';
import type { Head } from 'react-helmet';
import Html from '../../shared/components/Html';
import assets from './assets';

// This is output by Webpack after the bundle is compiled. It contains
// information about the files Webpack bundled. ASSETS_MANIFEST is
// inlined as a path when processed by Webpack.
const clientAssets = assets();

function KeyedComponent({ children }) {
  return Children.only(children);
}

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

/**
 * Takes a stylesheet file path and creates an html
 * style element
 * @param  {string} stylesheetFilePath path of the file
 * @return {element}                    dom element
 */
function createStyleElement(stylesheetFilePath: string) {
  return (
    <link
      href={stylesheetFilePath}
      media="screen, projection"
      rel="stylesheet"
      type="text/css"
    />
  );
}

/**
 * Takes a javascript file path and creates an html
 * script element
 * @param  {string} jsFilePath          path of the file
 * @return {element}                    dom element
 */
function createScriptElement(jsFilePath: string) {
  return <script type="text/javascript" src={jsFilePath} />;
}

type Props = {
  reactAppString: string,
  nonce: string,
  preloadedState: Object,
  helmet: Head,
};

export default function CreateHtml(props: Props) {
  const { reactAppString, nonce, preloadedState, helmet } = props;

  // Creates an inline script definition that is protected by the nonce.
  const inlineScript = body => (
    <script
      nonce={nonce}
      type="text/javascript"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  ); // eslint-disable-line

  const headerElements = removeNil([
    // if React Helmet component, render the helmet data
    // else act as an empty array.
    ...ifElse(helmet)(() => helmet.title.toComponent(), []),
    ...ifElse(helmet)(() => helmet.base.toComponent(), []),
    ...ifElse(helmet)(() => helmet.meta.toComponent(), []),
    ...ifElse(helmet)(() => helmet.link.toComponent(), []),
    // This is somewhat wonky, but basically:
    // if env === production && we have clientAssets && clientAssets has
    // vendor css, create a style element with it.
    ifElse(isProd && clientAssets && clientAssets.vendor.css)(() =>
      createStyleElement(clientAssets.vendor.css),
    ),
    ifElse(isProd && clientAssets && clientAssets.app.css)(() =>
      createStyleElement(clientAssets.app.css),
    ),
    ...ifElse(helmet)(() => helmet.style.toComponent(), []),
  ]);

  const bodyElements = removeNil([
    // Places the Redux store data on the window available at
    // window.__PRELOADED_STATE__
    inlineScript(
      `window.__PRELOADED_STATE__=${serialize(props.preloadedState)};`,
    ),
    // Polyfill whatever the browser doesnt provide that is necessary
    // for the application to run. Much lighter than using babel-polyfill
    // and results in smaller bundles.
    createScriptElement(
      'https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Symbol',
    ),
    ifElse(isProd && clientAssets && clientAssets.common)(() =>
      createScriptElement(clientAssets.common.js),
    ),
    ifElse(isProd && clientAssets && clientAssets.vendor.js)(() =>
      createScriptElement(clientAssets.vendor.js),
    ),
    ifElse(isDev)(() =>
      createScriptElement(`/assets/__vendor_dlls__.js?t=${uuid()}`),
    ),

    ifElse(clientAssets && clientAssets.app.js)(() =>
      createScriptElement(clientAssets.app.js),
    ),
    ...ifElse(helmet)(() => helmet.script.toComponent(), []),
  ]);

  return (
    <Html
      htmlAttributes={ifElse(helmet)(
        () => helmet.htmlAttributes.toComponent(),
        null,
      )}
      headerElements={headerElements.map((x, idx) => (
        <KeyedComponent key={idx}>{x}</KeyedComponent>
      ))}
      bodyElements={bodyElements.map((x, idx) => (
        <KeyedComponent key={idx}>{x}</KeyedComponent>
      ))}
      appBodyString={reactAppString}
    />
  );
}
