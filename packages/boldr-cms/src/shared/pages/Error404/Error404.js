/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import BaseTemplate from '../templates/Base';

function Error404() {
  return (
    <div className="error_wrapper">
    <BaseTemplate helmetMeta={ <Helmet title="404! You might be lost..." /> }>
      <p>Sorry, that page was not found.</p>
    </BaseTemplate>
    </div>
  );
}

export default Error404;
