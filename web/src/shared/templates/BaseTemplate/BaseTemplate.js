/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Footer from '~components/Footer';
import { showHeader } from '~state/modules/boldr/ui/actions';
import Hero from '../../components/Hero/Hero';

export type Props = {
  helmetMeta?: ReactElement,
  hero?: ReactElement,
  children: ReactChildren,
  footer?: ReactElement,
  me: ?User,
  isMobile: boolean,
  auth: Object,
  data: Object,
  showHeader: () => void,
  bgColor: ?string,
  bgImg: ?string,
  heroContent: any,
};

const Wrapper = styled.div`
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

export class BaseTemplate extends Component {
  static defaultProps = {
    bgColor: '#00b4d0',
  };
  componentDidMount() {
    this.props.showHeader();
  }
  props: Props;
  render() {
    return (
      <Wrapper>
        {this.props.helmetMeta}
        {this.props.heroContent
          ? <Hero bgColor={this.props.bgColor} bgImg={this.props.bgImg}>
              {this.props.heroContent}
            </Hero>
          : null}
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

const mapStateToProps = state => {
  return {
    showHeader: state.boldr.ui.showHeader,
  };
};
export default connect(mapStateToProps, { showHeader })(BaseTemplate);
