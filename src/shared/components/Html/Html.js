/* eslint-disable jsx-a11y/html-has-lang, react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

function Html(props) {
  const { htmlAttributes, headerElements, bodyElements, appBodyString } = props;

  return (
    <html {...htmlAttributes}>
      <head>
        {headerElements}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: appBodyString }} />
        {bodyElements}
      </body>
    </html>
  );
}

Html.propTypes = {
  htmlAttributes: PropTypes.object,
  headerElements: PropTypes.node,
  bodyElements: PropTypes.node,
  appBodyString: PropTypes.string,
};

Html.defaultProps = {
  htmlAttributes: null,
  headerElements: null,
  bodyElements: null,
  appBodyString: '',
};

export default Html;
