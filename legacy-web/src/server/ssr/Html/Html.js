/* @flow */
/* eslint-disable jsx-a11y/html-has-lang, react/forbid-prop-types */
import React from 'react';

type Props = {
  htmlAttributes: ?Object,
  headerElements?: number | string | ReactElement<*> | Array<any>,
  bodyElements?: number | string | ReactElement<*> | Array<any>,
  appBodyString?: string,
  styledCss: ?Array<Object>,
};

function Html(props: Props) {
  const {
    htmlAttributes,
    headerElements,
    bodyElements,
    appBodyString,
    styledCss,
  } = props;

  return (
    <html {...htmlAttributes}>
      <head>
        {headerElements}
      </head>
      <body className="ltr">
        <div id="app" dangerouslySetInnerHTML={{ __html: appBodyString }} />
        {bodyElements}
      </body>
    </html>
  );
}

Html.defaultProps = {
  htmlAttributes: null,
  headerElements: null,
  bodyElements: null,
  appBodyString: '',
};

export default Html;
