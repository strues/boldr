/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Grid, Hero, Row, Footer, Headline, Paragraph } from 'boldr-ui';
import { BaseTemplate } from '../../templates';

const Home = () => {
  return (
    <div>
      <BaseTemplate
        helmetMeta={<Helmet title="Home" />}
        hero={
          <Hero bgColor="#01579b">
            <Headline type="h1">
              A
              {' '}
              <span style={{ color: 'rgb(229, 0, 80)' }}>modern</span>
              {' '}
              content management framework.
            </Headline>
          </Hero>
        }
        footer={<Footer />}
      >
        <Row style={{ padding: '25px' }}>
          <Paragraph>Placeholder</Paragraph>
        </Row>
      </BaseTemplate>
    </div>
  );
};

export default Home;
