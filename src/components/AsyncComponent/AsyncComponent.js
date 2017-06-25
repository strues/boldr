import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import Loader from '@@components/Loader';

export const LoadingComponent = ({ isLoading, pastDelay, error }) => {
  if (isLoading) {
    return pastDelay ? <Loader /> : null;
  } else if (error) {
    return <div> Fail to load compoent </div>;
  } else {
    return null;
  }
};

AsyncComponent.propTypes = {
  isLoading: PropTypes.boolean,
  pastDelay: PropTypes.boolean,
  error: PropTypes.object,
};

export default function AsyncComponent(opts) {
  return Loadable(
    Object.assign(
      {
        loading: LoadingComponent,
        delay: 200,
        timeout: 10,
      },
      opts,
    ),
  );
}
