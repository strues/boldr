/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import Headline from '@boldr/ui/Headline';

function Error404() {
  return (
    <div className="error_wrapper">
      <Helmet title="404! You might be lost..." />
      <Headline type="h1" text="404!" />
      <p>SORRY PAGE NOT FOUND</p>
    </div>
  );
}

export default Error404;
