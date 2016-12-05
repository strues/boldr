import React, { PropTypes } from 'react';

const Heading = (props) => {
  const tagName = `h${props.size}`;
  let className = `heading heading__${props.size}`;
  if (props.classname) {
    className = `${props.classname} heading heading--${props.size}`;
  }
  const style = {
    color: props.color,
    textAlign: props.align,
    paddingTop: props.top,
    paddingBottom: props.bottom,
    fontSize: props.override,
    textDecoration: props.textDeco,
  };
  return React.createElement(tagName, { className, style }, props.children);
};

export default Heading;

Heading.propTypes = {
  size: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  color: PropTypes.string,
  align: PropTypes.string,
  classname: PropTypes.string,
  children: PropTypes.node,
  top: PropTypes.string,
  bottom: PropTypes.string,
  override: PropTypes.string,
  textDeco: PropTypes.string,
};
