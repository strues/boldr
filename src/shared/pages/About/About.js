/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import { BaseTemplate } from '../../templates';

function About() {
  return (
    <div>
      <BaseTemplate helmetMeta={ <Helmet title="About" /> }>
        Produced with <span role="img" aria-label="heart">❤️</span>
        by
        &nbsp;
        <a href="https://twitter.com/struesco" target="_blank" rel="noopener noreferrer">
          Steven Truesdell
        </a>
      </BaseTemplate>
    </div>
  );
}

export default About;
