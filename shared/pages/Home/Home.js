/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import BaseTemplate from '../templates/Base';
import { Grid, Row, Hero, Footer } from '../../components/index';

const Home = () => {
  return (
    <div>
      <BaseTemplate
        helmetMeta={ <Helmet title="Home" /> }
        hero={ <Hero /> }
        footer={ <Footer /> }
      >
      <Grid fluid>
        <Row style={ { padding: '25px' } }>
          Placeholder
        </Row>
      </Grid>
      </BaseTemplate>
    </div>
  );
};


export default Home;
