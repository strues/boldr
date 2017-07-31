// @flow
import React from 'react';
import classNames from 'classnames';

import { getSizeModifiers, removeSizeProps, createWrappedComponent } from '../UiHelpers/boldrui';
import { getDomSafeProps } from '../UiHelpers/helpers';
import { StyleClasses } from '../../theme/styleClasses';

const BASE_ELEMENT = StyleClasses.FORM_LABEL;
export type Props = {
  className?: string,
  children: ReactChildren,
};
export function Label(props: Props) {
  const className = classNames(
    BASE_ELEMENT,
    {
      ...getSizeModifiers(props),
    },
    props.className,
  );

  const HTMLProps = getDomSafeProps(props, removeSizeProps);

  return <label {...HTMLProps} className={className} />;
}

export default createWrappedComponent(Label);
