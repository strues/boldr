/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import PageTemplate from '../../theme/Boldr';
import { Grid, Row, Hero, Footer } from '../../components/index';
import { safeConfigGet } from '../../core/utils/config';

const Home = () => {
  return (
      <PageTemplate
        helmetMeta={ <Helmet title="Home" /> }
        hero={ <Hero /> }
        footer={ <Footer /> }
      >
      <Grid fluid>
        <Row style={ { padding: '25px' } }>
          Placeholder
        </Row>
      </Grid>
      </PageTemplate>
  );
};


export default Home;
