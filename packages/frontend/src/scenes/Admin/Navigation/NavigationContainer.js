/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { bindActionCreators } from 'redux';
import Headline from '@boldr/ui/Headline';
import ContentPromo from '@boldr/ui/ContentPromo';
// import { updateMenuDetails, addMenuDetail } from '../../../state/boldr/menu/actions';
// import Navigation from './Navigation';
import MENU_QUERY from './menu.graphql';

type Props = {
  data: Object,
  actions: Object,
};
class NavigationContainer extends Component {
  props: Props;
  render() {
    return (
      <div>
        <ContentPromo isCentered>
          <Headline kind="h1">Navigation</Headline>
        </ContentPromo>
      </div>
    );
  }
}
//
// const mapDispatchToProps = dispatch => {
//   return {
//     actions: bindActionCreators(
//       {
//         updateMenuDetails,
//         addMenuDetail,
//       },
//       dispatch,
//     ),
//   };
// };
export default graphql(MENU_QUERY, {
  options: props => ({
    variables: {
      id: 1,
    },
  }),
})(NavigationContainer);
