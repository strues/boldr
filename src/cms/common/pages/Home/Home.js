/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Header, Icon, Segment, Container } from 'semantic-ui-react';
import { Row, Hero, PrimaryHeader, Footer } from 'components/index';
import { fetchPagesIfNeeded } from 'state/index';
import PostListing from 'scenes/Blog/PostListing';
import PageTemplate from '../../theme/Boldr/PageTemplate';

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
        header={ <PrimaryHeader /> }
        hero={ <Hero /> }
        footer={ <Footer /> }
      >
      <Container fluid>
        <Row style={ { padding: '25px' } }>
        <Segment>
          <Header as="h1">
            <Icon name="newspaper" />
            <Header.Content>
              Recent posts
            </Header.Content>
          </Header>
          </Segment>
        </Row>
        <PostListing />
      </Container>
      </PageTemplate>
  );
};

const mapStateToProps = (state) => {
  return {
    pages: state.boldr.pages,
    loaded: state.boldr.pages.loaded,
  };
};

export default connect(mapStateToProps, { fetchPagesIfNeeded })(Home);
