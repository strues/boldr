/* @flow */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Footer } from 'boldr-ui';
import { fetchTemplateResource } from '../../../state/modules/boldr/templates/actions';
import { fetchMenusIfNeeded, getByLabel } from '../../../state/modules/boldr/menu';
import { logout } from '../../../state/modules/auth/actions';
import { selectMe } from '../../../state/modules/users';
import { MainHeader } from '../../../components/index';
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
  me: ?Object,
  isMobile: Boolean,
  ui: Object,
  menu: Object,
  logo: Object,
  auth: Object,
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
  box-sizing: border-box;
  position: relative;
  margin: 0 auto;
  padding-bottom: 250px;
  background-color: #e5eaed;
`;

const FooterWrapper = styled.div`
  margin-top: auto;
`;

const mapStateToProps = (state: Object) => {
  return {
    me: selectMe(state),
    auth: state.auth,
    menu: state.boldr.menu.main,
    isMobile: state.boldr.ui.isMobile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        logout,
        fetchMenusIfNeeded,
      },
      dispatch,
    ),
    navigate: url => dispatch(push(url)),
    dispatch,
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class BaseTemplate extends PureComponent {
  static fetchData(dispatch, params) {
    return Promise.all([dispatch(fetchMenusIfNeeded())]);
  }
  componentDidMount() {
    const { dispatch } = this.props;

    BaseTemplate.fetchData(dispatch);
  }
  handleLogoClick = e => {
    this.props.navigate('/');
  };
  handleDashClick = e => {
    this.props.navigate('/admin');
  };
  handleProfileClick = e => {
    this.props.navigate(`/profiles/${this.props.me.username}`);
  };
  handleLogoutClick = e => {
    this.props.actions.logout();
  };
  props: Props;
  render() {
    return (
      <Wrapper { ...this.props }>
        {this.props.helmetMeta}

        <MainHeader
          auth={ this.props.auth }
          logo={ this.props.logo }
          me={ this.props.me }
          menu={ this.props.menu.details }
          isMobile={ this.props.isMobile }
          handleProfileClick={ this.handleProfileClick }
          handleLogoClick={ this.handleLogoClick }
          handleLogoutClick={ this.handleLogoutClick }
          handleDashClick={ this.handleDashClick }
        />
        {this.props.hero ? this.props.hero : null}

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

export default BaseTemplate;

export { Wrapper, FooterWrapper };
