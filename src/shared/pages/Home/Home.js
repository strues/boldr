/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import { Hero, Row, Grid, Col, Footer, Headline, Paragraph } from 'boldr-ui';
import { BaseTemplate } from '../../templates';

const Home = () => {
  return (
    <div>
      <BaseTemplate
        helmetMeta={<Helmet title="Home" />}
        hero={
          <Hero bgColor="#00b4d0">
            <Headline type="h1">
              A
              {' '}
              <span style={{ color: 'rgb(229, 0, 80)' }}>modern</span>
              {' '}
              Content Management Framework.
            </Headline>
          </Hero>
        }
        footer={<Footer />}
      >
        <Grid>
          <Row style={{ paddingTop: '75px' }}>
            <Col xs={12} md={4}>
              <Headline type="h2">Placeholder 1</Headline>
              <Paragraph>
                Eget mattis at, laoreet vel et velit aliquam diam ante, aliquet sit amet vulputate. Eget mattis at, laoreet vel velit lorem.
              </Paragraph>
            </Col>
            <Col xs={12} md={4}>
              <Headline type="h2">Placeholder 2</Headline>
              <Paragraph>
                Eget mattis at, laoreet vel et velit aliquam diam ante, aliquet sit amet vulputate. Eget mattis at, laoreet vel velit lorem.
              </Paragraph>
            </Col>
            <Col xs={12} md={4}>
              <Headline type="h2">Placeholder 3</Headline>
              <Paragraph>
                Eget mattis at, laoreet vel et velit aliquam diam ante, aliquet sit amet vulputate. Eget mattis at, laoreet vel velit lorem.
              </Paragraph>
            </Col>
          </Row>
        </Grid>
      </BaseTemplate>
    </div>
  );
};

export default Home;
