/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import Heading from '@boldr/ui/Heading';

function About() {
  return (
    <div>
      <Helmet title="About" />
      <Heading type="h1" text="About" />
    </div>
  );
}
export default About;
