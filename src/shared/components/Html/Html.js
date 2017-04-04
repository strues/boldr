import React, { PropTypes } from 'react';

function Html(props) {
  const {
    title,
    description,
    appBodyString,
    headerElements,
    bodyElements,
  } = props;

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="application-name" content={ title } />
        <meta name="description" content={ description } />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="msapplication-TileColor" content="#2b2b2b" />
        <meta name="msapplication-TileImage" content="/favicons/mstile-150x150.png" />
        <meta name="theme-color" content="#2b2b2b" />
        <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/favicons/apple-touch-icon.png" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#00a9d9" />
        <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" sizes="16x16 32x32" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#2b2b2b" />
        <meta name="msapplication-TileImage" content="/favicons/mstile-150x150.png" />
        <meta name="msapplication-square150x150logo" content="/favicons/mstile-150x150.png" />
        <link rel="manifest" href="/manifest.json" />
        {headerElements}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={ { __html: appBodyString } } />
        {bodyElements}
      </body>
    </html>
  );
}

Html.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  appBodyString: PropTypes.string,
  headerElements: PropTypes.node,
  bodyElements: PropTypes.node,
};

Html.defaultProps = {
  appBodyString: '',
  headerElements: null,
  bodyElements: null,
};

export default Html;
