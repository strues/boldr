/* @flow */
/* eslint-disable react/no-danger, react/no-array-index-key, react/jsx-key */
/**
 * @module boldr/framework/server/page/CreateHtml
 */
import React, { Children } from 'react';
import serialize from 'serialize-javascript';
import ifElse from 'boldr-tools/es/logic/ifElse';
import removeNil from 'boldr-tools/es/arrays/removeNil';

import type { Head } from 'react-helmet';
import Html from './Html';

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
    <link href={stylesheetFilePath} media="screen, projection" rel="stylesheet" type="text/css" />
  );
}

/**
 * Takes a javascript file path and creates an html
 * script element
 * @param  {string} jsFilePath          path of the file
 * @return {element}                    dom element
 */
function createScriptElement(jsFilePath: string) {
  return <script type="text/javascript" src={`http://localhost:3000/static/${jsFilePath}`} />;
}

type Props = {
  reactAppString: string,
  nonce: string,
  preloadedState: Object,
  materialCss: Object,
  helmet: Head,
  assets: Object,
};

export default function CreateHtml(props: Props) {
  const { reactAppString, nonce, preloadedState, helmet, materialCss, assets } = props;

  const inlineScript = body =>
    <script nonce={nonce} type="text/javascript" dangerouslySetInnerHTML={{ __html: body }} />; // eslint-disable-line

  const materialStyleElement = (materialCss: Object) => {
    return <style nonce={nonce} id="jss-server-side" type="text/css">{materialCss}</style>;
  };

  const headerElements = removeNil([
    // if React Helmet component, render the helmet data
    // else act as an empty array.
    ...ifElse(helmet)(() => helmet.title.toComponent(), []),
    ...ifElse(helmet)(() => helmet.base.toComponent(), []),
    ...ifElse(helmet)(() => helmet.meta.toComponent(), []),
    ...ifElse(helmet)(() => helmet.link.toComponent(), []),

    ...ifElse(helmet)(() => helmet.style.toComponent(), []),
  ]);

  const bodyElements = removeNil([
    inlineScript(`window.__APOLLO_STATE__=${serialize(preloadedState)};`),
    // embed material-ui style element
    materialStyleElement(materialCss),
    // dlls only used in dev
    ifElse(isDev)(() => createScriptElement('boldrDLLs.js')),
    // webpack bootstrap code shit
    ifElse(assets.bootstrap)(() => createScriptElement(assets.bootstrap[0])),
    ifElse(isProd && assets.vendor)(() => createScriptElement(assets.vendor[0])),
    ifElse(assets && assets.app)(() => createScriptElement(assets.app[0])),

    ...ifElse(helmet)(() => helmet.script.toComponent(), []),
  ]);

  return (
    <Html
      htmlAttributes={ifElse(helmet)(() => helmet.htmlAttributes.toComponent(), null)}
      headerElements={headerElements.map((x, idx) =>
        <KeyedComponent key={idx}>{x}</KeyedComponent>,
      )}
      bodyElements={bodyElements.map((x, idx) => <KeyedComponent key={idx}>{x}</KeyedComponent>)}
      appBodyString={reactAppString}
    />
  );
}
