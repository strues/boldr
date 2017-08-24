/* @flow */

import * as React from 'react';
import Route from 'react-router-dom/Route';
import { flattenRoutes } from '@boldr/core';
import routes from './routes';

type Props = {
  path: string,
};
// eslint-disable-next-line
const AccountContainer = (props: Props) => {
  const flattenedRoutes = flattenRoutes(routes);
  return (
    <div>
      {flattenedRoutes.map(props => <Route key={props.path} {...props} />)}
    </div>
  );
};

export default AccountContainer;
