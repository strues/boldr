/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import Headline from '@boldr/ui/Headline';
import { Section, Container } from '../../components/Layout';

function About() {
  return (
    <div>
      <Helmet title="About" />
      <Headline type="h1">About</Headline>
      <Section>
        <Container>
          <Headline type="h1">About</Headline>
        </Container>
      </Section>
    </div>
  );
}
export default About;
