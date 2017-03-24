/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import BaseTemplate from '../templates/Base';

import { Grid, Hero, Row, Footer, Heading, Paragraph } from '../../components/index';

const Home = () => {
  return (
    <div>
      <BaseTemplate
        helmetMeta={ <Helmet title="Home" /> }
        hero={
          <Hero bgColor="#01579b">
            <Heading size={ 1 }>
              A <span style={ { color: 'rgb(229, 0, 80)' } }>modern</span> content management framework.
            </Heading>
          </Hero>
        }
        footer={ <Footer /> }
      >
        <Row style={ { padding: '25px' } }>
          <Paragraph>Placeholder</Paragraph>
        </Row>
      </BaseTemplate>
    </div>
  );
};

export default Home;
