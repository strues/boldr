import React from 'react';
import RedBox from 'redbox-react';

const WrappedRedBox = ({ error }) => {
  if (error) {
    console.error(error.message, error.stack); // eslint-disable-line no-console
  }

  return <RedBox error={ error } />;
};

WrappedRedBox.propTypes = {
  error: React.PropTypes.instanceOf(Error).isRequired,
};

export default WrappedRedBox;
