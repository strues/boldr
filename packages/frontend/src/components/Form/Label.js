// @flow
import React from 'react';
import classNames from 'classnames';

import { getSizeModifiers, removeSizeProps, createWrappedComponent } from '../util/boldrui';
import { getDomSafeProps } from '../util/helpers';
import { StyleClasses } from '../../theme/styleClasses';

const BASE_ELEMENT = StyleClasses.FORM_LABEL;
export type Props = {
  className?: string,
  children: React.Element<'label'>,
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
