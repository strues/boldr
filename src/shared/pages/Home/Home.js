/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import Footer from '@@components/Footer';
import Headline from '@@components/Headline';
import Paragraph from '@@components/Paragraph';
import Button from '../../components/Button';
import Hero from '../../components/Hero';
import { Grid, Row, Col } from '@@components/Layout';
import HomeHero from './HomeHero';

const Home = () => {
  return (
    <div>
      <Helmet title="Home" />
      <Hero bgColor="#00b4d0">
        <Headline type="h1">Meet Boldr.</Headline>
        <Paragraph isLead>
          A modern content management framework.
        </Paragraph>
        <Button type="primary">Learn More</Button>
      </Hero>
      <Grid>
        <Row>
          <Col xs={12} md={4}>
            <Headline type="h2">Placeholder 1</Headline>
            <Paragraph>
              Eget mattis at, laoreet vel et velit aliquam diam ante, aliquet sit amet vulputate.
              Eget mattis at, laoreet vel velit lorem.
            </Paragraph>
          </Col>
          <Col xs={12} md={4}>
            <Headline type="h2">Placeholder 2</Headline>
            <Paragraph>
              Eget mattis at, laoreet vel et velit aliquam diam ante, aliquet sit amet vulputate.
              Eget mattis at, laoreet vel velit lorem.
            </Paragraph>
          </Col>
          <Col xs={12} md={4}>
            <Headline type="h2">Placeholder 3</Headline>
            <Paragraph>
              Eget mattis at, laoreet vel et velit aliquam diam ante, aliquet sit amet vulputate.
              Eget mattis at, laoreet vel velit lorem.
            </Paragraph>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Home;
