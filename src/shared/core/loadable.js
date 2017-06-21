import React from 'react';
import PropTypes from 'prop-types';
import loadable from 'react-loadable';
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

LoadingComponent.propTypes = {
  isLoading: PropTypes.boolean,
  pastDelay: PropTypes.boolean,
  error: PropTypes.object,
};

export default loader =>
  loadable({
    loader,
    loading: LoadingComponent,
  });
