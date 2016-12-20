import React from 'react';
import { Link } from 'react-router';

const Anchor = (props) => {
  const activeStyle = {
    color: 'red',
  };

  return (
    <Link { ...props } activeStyle={ activeStyle } />
  );
};

export default Anchor;
