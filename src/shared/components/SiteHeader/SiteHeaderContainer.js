/* @flow */
import React from 'react';
import { graphql, gql } from 'react-apollo';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from '@boldr/ui/Loader';

import { logout } from '../../scenes/Account/state/actions';
import { selectSettings, selectSettingFromList, selectMe } from '../../state';
import SiteHeader from './SiteHeader';

type Props = {
  data: SiteHeaderData,
  actions: Object,
  navigate: () => void,
  me: User,
  showHeader: boolean,
  isMobile: boolean,
  settings: Array<Setting>,
  auth: Object,
};
type SiteHeaderData = {
  getMenuById: Menu,
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
    const { loading, getMenuById } = this.props.data;
    if (loading) {
      return <Loader />;
    } else {
      return (
        <div>
          {this.props.showHeader
            ? <SiteHeader
                auth={this.props.auth}
                me={this.props.me}
                settings={this.props.settings}
                details={getMenuById.details}
                isMobile={this.props.isMobile}
                handleProfileClick={this.handleProfileClick}
                handleLogoutClick={this.handleLogoutClick}
              />
            : null}
        </div>
      );
    }
  }
}

export const MENU_QUERY = gql`
 query getMenuById($id: ID!) {
   getMenuById(id: $id) {
      id,
      name,
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

const mapStateToProps = (state: Object) => {
  return {
    me: selectMe(state),
    auth: state.auth,
    isMobile: state.boldr.ui.isMobile,
    showHeader: state.boldr.ui.showHeader,
  };
};
// $FlowIssue
export default connect(mapStateToProps, mapDispatchToProps)(SiteHeaderContainerWithData);
