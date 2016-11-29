/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Container } from 'semantic-ui-react';
import { Row, Hero, Footer } from '../../../components/index';
import { getPageByLabel } from 'state/selectors';
import PageTemplate from 'theme/Boldr/PageTemplate';


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
      <Container fluid>
        <Row style={ { padding: '25px' } }>
          Placeholder
        </Row>
      </Container>
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
