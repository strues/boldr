/* @flow */
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';
import type { ReactChildren } from '../../types/react.js.flow';

type Props = {
  size: number,
  color: ?string,
  align: ?string,
  fweight: ?number,
  classname: ?string,
  children: ReactChildren,
  top: ?string,
  bottom: ?string,
  fsize: ?string,
  textDeco: ?string,
};

const BASE_ELEMENT = StyleClasses.HEADING;

const Heading = (props: Props) => {
  const className = classnames(BASE_ELEMENT, `${BASE_ELEMENT}__${props.size}`, props.classname);
  const tagName = `h${props.size}`;

  const style = {
    color: props.color,
    textAlign: props.align,
    paddingTop: props.top,
    paddingBottom: props.bottom,
    fontSize: props.fsize,
    fontWeight: props.fweight,
    textDecoration: props.textDeco,
  };
  return React.createElement(
    tagName,
    {
      className,
      style,
    },
    props.children,
  );
};

export default Heading;
