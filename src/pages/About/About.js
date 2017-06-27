/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import Headline from '@boldr/ui/Headline';

function About() {
  return (
    <div>
      <Helmet title="About" />
      <Headline type="h1">About</Headline>
    </div>
  );
}
export default About;
