/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import PageTemplate from 'theme/Boldr/PageTemplate';

function About() {
  return (
    <div>
    <PageTemplate helmetMeta={ <Helmet title="About" /> }>
      Produced with ❤️
      by
      &nbsp;
      <a href="https://twitter.com/struesco" target="_blank" rel="noopener noreferrer">
        Steven Truesdell
      </a>
    </PageTemplate>
    </div>
  );
}

export default About;
