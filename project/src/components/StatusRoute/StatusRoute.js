// @flow
import React from 'react';
import type { Node } from 'react';
import Route from 'react-router-dom/Route';

type Props = {
  code: number,
  children: Node,
};

const StatusRoute = ({ code, children }: Props) => (
  <Route
    render={({ staticContext }) => {
      /* eslint-disable no-param-reassign */
      if (staticContext) {
        staticContext.status = code;
      }
      /* eslint-enable no-param-reassign */
      return children;
    }}
  />
);

export default StatusRoute;
