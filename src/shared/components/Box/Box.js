import React, { PropTypes } from 'react';
import mergeClassNames from 'classnames';
import style from './style.css';

/**
* A Box can display more important content in a simple manner.
*/
const Box = ({ className, children, ...rest }) => {
  const finalClassName = mergeClassNames({
    [style.box]: true,
    [className]: className && className.length,
  });

  return (
    <div { ...rest } className={ finalClassName }>
      {children}
    </div>
  );
};
Box.propTypes = {
  // The children to render within the Box.
  children: PropTypes.node.isRequired,
  // An optional className of the Box.
  className: PropTypes.string,
};

export default Box;
