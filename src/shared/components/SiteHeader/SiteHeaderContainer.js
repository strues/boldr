/* @flow */
import React from 'react';
import { graphql, gql } from 'react-apollo';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Loader } from 'boldr-ui';
import SiteHeader from './SiteHeader';
import {
  fetchMainMenuIfNeeded,
  selectSettings,
  logout,
  selectSettingFromList,
  selectMe,
} from '../../state';

type Props = {
  data: SiteHeaderData,
  actions: Object,
  navigate: () => void,
  me: User,
  isMobile: boolean,
  settings: Array<Setting>,
  auth: Object,
};
type SiteHeaderData = {
  menuById: Menu,
  loading: boolean,
};
class SiteHeaderContainer extends React.Component {
  handleProfileClick = () => {
    this.props.navigate(`/profiles/${this.props.me.username}`);
  };
  handleLogoutClick = () => {
    this.props.actions.logout();
  };
  props: Props;
  render() {
    const { loading, menuById } = this.props.data;
    if (loading) {
      return <Loader />;
    }
    return (
      <SiteHeader
        auth={this.props.auth}
        me={this.props.me}
        settings={this.props.settings}
        details={ menuById[0].details}
        isMobile={this.props.isMobile}
        handleProfileClick={this.handleProfileClick}
        handleLogoutClick={this.handleLogoutClick}
      />
    );
  }
}

export const MENU_QUERY = gql`
 query menuById($id: Int!) {
 menuById(id: $id) {
    id,
    details {
      id,
      uuid,
      safeName,
      name,
      cssClassname,
      icon,
      hasDropdown,
      order,
      mobileHref,
      href,
      children
    }
  }
  }
`;

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        logout,
        fetchMainMenuIfNeeded,
      },
      dispatch,
    ),
    navigate: url => dispatch(push(url)),
    dispatch,
  };
};
const SiteHeaderContainerWithData = graphql(MENU_QUERY, {
  options: props => ({
    variables: {
      id: 1,
    },
  }),
})(SiteHeaderContainer);
export default connect(null, mapDispatchToProps)(SiteHeaderContainerWithData);
