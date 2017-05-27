/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { bindActionCreators } from 'redux';
import { updateMenuDetails, addMenuDetail } from '~state';
import Navigation from './Navigation';

type Props = {
  data: Object,
  actions: Object,
};
class NavigationContainer extends Component {
  props: Props;
  render() {
    return (
      <Navigation
        mainMenu={this.props.data.getMenuById}
        updateMenuDetails={this.props.actions.updateMenuDetails}
        addMenuDetail={this.props.actions.addMenuDetail}
      />
    );
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
        updateMenuDetails,
        addMenuDetail,
      },
      dispatch,
    ),
  };
};
const NavigationContainerWithData = graphql(MENU_QUERY, {
  options: props => ({
    variables: {
      id: 1,
    },
  }),
})(NavigationContainer);
export default connect(null, mapDispatchToProps)(NavigationContainerWithData);
