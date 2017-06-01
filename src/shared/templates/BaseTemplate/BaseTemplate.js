/* @flow */
import React, { Component } from 'react';
import { compose, graphql, gql } from 'react-apollo';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Footer, Loader, Headline } from 'boldr-ui';
import Hero from '../../components/Hero/Hero';
import { selectMe } from '../../state/modules/users/selectors';
import SiteHeaderContainer
  from '../../components/SiteHeader/SiteHeaderContainer';

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
  bgColor: ?string,
  bgImg: ?string,
  heroContent: any,
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
  padding-top: 50px;
  padding-bottom: 150px;
  background-color: #e5eaed;
`;

const FooterWrapper = styled.div`
  margin-top: auto;
`;

class BaseTemplate extends Component {
  static defaultProps = {
    bgColor: '#00b4d0',
  };

  props: Props;
  render() {
    if (this.props.data.loading) {
      return <Loader />;
    }
    if (this.props.heroContent) {
      return (
        <Wrapper>
          {this.props.helmetMeta}
            <Hero bgColor={this.props.bgColor} bgImg={this.props.bgImg}>
            <SiteHeaderContainer
            auth={this.props.auth}
            me={this.props.me}
            settings={this.props.data.getSettings}
            isMobile={this.props.isMobile}
          />
              {this.props.heroContent}
            </Hero>

          <ContentWrapper>
            {this.props.children}
          </ContentWrapper>

          <FooterWrapper>
            {this.props.footer || <Footer />}
          </FooterWrapper>
        </Wrapper>
      );
    }
    return (
      <Wrapper>
        {this.props.helmetMeta}
        <SiteHeaderContainer
          auth={this.props.auth}
          me={this.props.me}
          settings={this.props.data.getSettings}
          isMobile={this.props.isMobile}
        />

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
    getSettings {
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
