import React, { PropTypes } from 'react';

const Heading = (props) => {
  const tagName = `h${props.size}`;
  let className = `boldr-heading boldr-heading__${props.size}`;
  if (props.classname) {
    className = `${props.classname} boldr-heading boldr-heading__${props.size}`;
  }
  const style = {
    color: props.color,
    textAlign: props.align,
    paddingTop: props.top,
    paddingBottom: props.bottom,
    fontSize: props.override,
    fontWeight: props.fweight,
    textDecoration: props.textDeco,
  };
  return React.createElement(tagName, { className, style }, props.children);
};

export default Heading;

Heading.propTypes = {
  size: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  color: PropTypes.string,
  align: PropTypes.string,
  fweight: PropTypes.number,
  classname: PropTypes.string,
  children: PropTypes.node,
  top: PropTypes.string,
  bottom: PropTypes.string,
  override: PropTypes.string,
  textDeco: PropTypes.string,
};
