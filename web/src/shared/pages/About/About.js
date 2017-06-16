/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import Headline from '~components/Headline';
import { BaseTemplate } from '../../templates';

function About() {
  return (
    <div>
      <BaseTemplate helmetMeta={<Helmet title="About" />}>
        <Headline type="h1">About</Headline>
      </BaseTemplate>
    </div>
  );
}
export default About;
