/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Footer from '@@components/Footer';
import Headline from '@@components/Headline';
import Paragraph from '@@components/Paragraph';
import Button from '../../components/Button';
import { Grid, Row, Col } from '@@components/Layout';

const HomeHero = styled.div`
  background-color: #00b4d0;
  height: 450px;
  width: 100%;
`;
const Home = () => {
  return (
    <div>
      <Helmet title="Home" />
      <HomeHero>
        <Headline type="h1">Meet Boldr.</Headline>
      </HomeHero>
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
