/* @flow */
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import type { ReactChildren } from '../../types/react';
import materialStyle from '../../theme/material';

const muiTheme = getMuiTheme(materialStyle);

type Props = {
  store: Object,
  children: ReactChildren,
};
class AppRoot extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  props: Props;

  render() {
    const { store, children } = this.props;
    return (
      <Provider store={ store }>
        <MuiThemeProvider muiTheme={ muiTheme }>
          { React.Children.only(children) }
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default AppRoot;
