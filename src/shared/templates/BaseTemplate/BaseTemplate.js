/* @flow */
import React, { Component } from 'react';
import { compose, graphql, gql } from 'react-apollo';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Footer, Loader } from 'boldr-ui';

import { selectMe } from '../../state/modules/users/selectors';
import SiteHeaderContainer
  from '../../components/SiteHeader/SiteHeaderContainer';

import type { ReactElement, ReactChildren } from '../../types/react';

type Props = {
  header: ReactElement,
  helmetMeta?: ReactElement,
  hero?: ReactElement,
  children: ReactChildren,
  footer?: ReactElement,
  dispatch: Function,
  actions: Object,
  me: ?User,
  isMobile: boolean,
  auth: Object,
  data: Object,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const ContentWrapper = styled.section`
  width: 100%;
  height: 100%;
  min-height: 100%;
  box-sizing: border-box;
  position: relative;
  margin: 0 auto;
  padding-bottom: 250px;
  background-color: #e5eaed;
`;

const FooterWrapper = styled.div`
  margin-top: auto;
`;

class BaseTemplate extends Component {
  props: Props;
  render() {
    if (this.props.data.loading) {
      return <Loader />;
    }
    return (
      <Wrapper>
        {this.props.helmetMeta}

        <SiteHeaderContainer
          auth={this.props.auth}
          me={this.props.me}
          settings={this.props.data.settings}
          isMobile={this.props.isMobile}
        />
        {this.props.hero || null}

        <ContentWrapper>
          {this.props.children}
        </ContentWrapper>

        <FooterWrapper>
          {this.props.footer || <Footer />}
        </FooterWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: Object) => {
  return {
    me: selectMe(state),
    auth: state.auth,
    isMobile: state.boldr.ui.isMobile,
  };
};

export { Wrapper, FooterWrapper };
export const SETTINGS_QUERY = gql`
  query {
    settings {
      id,
      key,
      value,
      label,
      description,
    }
}
`;
export default compose(graphql(SETTINGS_QUERY), connect(mapStateToProps))(
  BaseTemplate,
);
