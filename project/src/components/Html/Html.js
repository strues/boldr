/* eslint-disable no-inline-comments */
// @flow
import React from 'react';
import type { Node, Element } from 'react';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

type Props = {
  styles: $ReadOnlyArray<string>,
  cssHash: string,
  js: $ReadOnlyArray<string>,
  component: Node,
  state: Object,
  styleTags: Function,
  nonce: string,
};

const Html = (props: Props): Element<'html'> => {
  const { styles, cssHash, js, component, state, styleTags } = props;
  const head = Helmet.renderStatic();
  const htmlAttrs = head.htmlAttributes.toComponent();

  return (
    <html lang="en" {...htmlAttrs}>
      <head>
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}

        {/* $FlowIssue */}
        {styles.map(name => <link rel="stylesheet" href={`${__PUB_PATH__}${name}`} key={name} />)}

        {styleTags}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: component }} />

        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${serialize(state, { json: true })};`,
          }}
          charSet="UTF-8"
        />
        <script
          src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
          type="text/javascript"
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `WebFont.load({ google: { families: ['Roboto:300,400,700','Chivo:300,700'] } });`,
          }}
          charSet="UTF-8"
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.__CSS_CHUNKS__=${serialize(cssHash)};`,
          }}
          charSet="UTF-8"
        />

        {/* $FlowIssue */}
        {__DEV__ ? (
          <script type="text/javascript" charSet="UTF-8" src="/static/boldrDLLs.js" />
        ) : (
          <span />
        )}
        {js.map(name => (
          <script
            type="text/javascript"
            /* $FlowIssue */
            src={`${__PUB_PATH__}${name}`}
            key={name}
            charSet="UTF-8"
          />
        ))}
      </body>
    </html>
  );
};

export default Html;
