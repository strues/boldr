/* @flow */
import React from 'react';
import classnames from 'classnames';
import { StyleClasses, BOLDR_NS } from '../../theme/styleClasses';

type Props = {
  className: string,
};

const BASE_ELEMENT = StyleClasses.LOADER;

function Loader(props: Props) {
  const classes = classnames(BASE_ELEMENT, props.className);
  return (
    <div className={classes}>
      <div className={`${BASE_ELEMENT}__item`}>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default Loader;
