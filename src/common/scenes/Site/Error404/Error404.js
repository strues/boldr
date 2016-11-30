/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import PageTemplate from '../../../theme/Boldr/PageTemplate';

function Error404() {
  return (
    <div className="error_wrapper">
    <PageTemplate helmetMeta={ <Helmet title="404! You might be lost..." /> }>
      <p>Sorry, that page was not found.</p>
    </PageTemplate>
    </div>
  );
}

export default Error404;
