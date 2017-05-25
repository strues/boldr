/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import { Hero, Row, Grid, Col, Footer, Headline, Paragraph } from 'boldr-ui';
import { BaseTemplate } from '../../templates';
import HomeHero from './HomeHero';

const Home = () => {
  return (
    <div>
      <BaseTemplate
      helmetMeta={<Helmet title="Home" />}
      footer={<Footer />}

      heroContent={<HomeHero />}
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
