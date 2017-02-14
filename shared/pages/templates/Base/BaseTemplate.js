/* @flow */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTemplateResource } from '../../../state/modules/boldr/templates/actions';
import { fetchMenusIfNeeded, getByLabel } from '../../../state/modules/boldr/menu';
import { logout } from '../../../state/modules/auth/actions';
import { PrimaryHeader, Footer } from '../../../components/index';
import type { ReactElement, ReactChildren } from '../../../types/react';

type Props = {
  header: ReactElement,
  helmetMeta?: ReactElement,
  hero?: ReactElement,
  children: ReactChildren,
  footer?: ReactElement,
  navigate: Function,
  dispatch: Function,
  actions: Object,
  isMobile: Boolean,
  ui: Object,
  menu: Object,
  logo: Object,
  auth: Object,
  helmetMeta?: ReactElement,
  hero?: ReactElement,
  children: ReactChildren,
  footer?: ReactElement
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  box-sizing: border-box;
`;

const ContentWrapper = styled.section`
  width: 100%;
  padding-top: 60px;
  box-sizing: border-box;
  margin: 0 auto;
  background-color: #e5eaed;
`;

const FooterWrapper = styled.footer`
  margin-top: auto;
`;

const mapStateToProps = (state: Object) => {
  return {
    auth: state.auth,
    menu: state.boldr.menu.main,
    isMobile: state.boldr.ui.isMobile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ logout, fetchMenusIfNeeded }, dispatch),
    navigate: (url) => dispatch(push(url)),
    dispatch,
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class BaseTemplate extends PureComponent {
  static fetchData(dispatch, params) {
    return Promise.all([
      dispatch(fetchMenusIfNeeded()),
    ]);
  }
  constructor() {
    super();
    (this: any).handleLogoClick = this.handleLogoClick.bind(this);
    (this: any).handleLogoutClick = this.handleLogoutClick.bind(this);
    (this: any).handleDashClick = this.handleDashClick.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;

    BaseTemplate.fetchData(dispatch);
  }
  handleLogoClick = (e) => {
    this.props.navigate('/');
  }
  handleDashClick = (e) => {
    this.props.navigate('/admin');
  }
  handleLogoutClick = (e) => {
    this.props.actions.logout();
  }
  props: Props;
  render() {
    return (
      <Wrapper { ...this.props }>
          { this.props.helmetMeta }

          <PrimaryHeader
            auth={ this.props.auth }
            logo={ this.props.logo }
            menu={ this.props.menu }
            isMobile={ this.props.isMobile }
            handleLogoClick= { this.handleLogoClick }
            handleLogoutClick={ this.handleLogoutClick }
            handleDashClick={ this.handleDashClick }
          />

          { this.props.hero ? this.props.hero : null }

          <ContentWrapper>
            { this.props.children }
          </ContentWrapper>

          <FooterWrapper>
            { this.props.footer || <Footer /> }
          </FooterWrapper>
      </Wrapper>
    );
  }
}

export default BaseTemplate;

export { Wrapper, FooterWrapper };
