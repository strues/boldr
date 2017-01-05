/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import BaseTemplate from '../templates/Base';
import { Grid, Row, Hero, Footer } from '../../components/index';
import { safeConfigGet } from '../../core/utils/config';

const Home = () => {
  return (
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
  );
};


export default Home;
