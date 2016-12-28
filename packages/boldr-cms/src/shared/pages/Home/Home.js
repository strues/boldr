/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import PageTemplate from '../../theme/Boldr';
import { getPageByLabel } from '../../state/modules/boldr/pages';
import { Grid, Row, Hero, Footer } from '../../components/index';
import { safeConfigGet } from '../../core/utils/config';

type Props = {
  loaded: Boolean,
  pages: Object,
  entities: Object,
  dispatch: Function
};

const Home = (props: Props) => {
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

const mapStateToProps = (state) => {
  const pageLabel = 'home';
  return {
    page: getPageByLabel(state, pageLabel),
  };
};

export default connect(mapStateToProps)(Home);
