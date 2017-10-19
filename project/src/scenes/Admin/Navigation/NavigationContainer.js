/* @flow */
import React from 'react';
import { graphql } from 'react-apollo';
import Heading from '@boldr/ui/Heading';
import ContentPromo from '@boldr/ui/ContentPromo';
import MENU_QUERY from './menu.graphql';

function NavigationContainer() {
  return (
    <div>
      <ContentPromo isCentered>
        <Heading kind="h1">Navigation</Heading>
      </ContentPromo>
    </div>
  );
}

export default graphql(MENU_QUERY, {
  options: () => ({
    variables: {
      id: 1,
    },
  }),
})(NavigationContainer);
