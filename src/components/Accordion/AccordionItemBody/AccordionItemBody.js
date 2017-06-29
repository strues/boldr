/* @flow */
import React from 'react';
import classNames from 'classnames';
import type { ReactChildren } from '../../../types/react.js.flow';

type Props = {
  id: string,
  expanded: boolean,
  onClick: () => void,
  ariaControls: string,
  children: ReactChildren,
  className: string,
  hideBodyClassName: string,
  role: string,
};

const defaultProps = {
  id: '',
  expanded: false,
  className: 'boldrui-accordion__body',
  hideBodyClassName: 'boldrui-accordion__body--hidden',
  role: '',
};

const AccordionItemBody = ({
  id,
  expanded,
  children,
  className,
  hideBodyClassName,
  role,
}: Props) => {
  const bodyClass = classNames(className, {
    [hideBodyClassName]: !expanded,
  });
  const ariaHidden = !expanded;
  return (
    <div id={id} className={bodyClass} aria-hidden={ariaHidden} role={role}>
      {children}
    </div>
  );
};

AccordionItemBody.defaultProps = defaultProps;
AccordionItemBody.accordionElementName = 'AccordionItemBody';

export default AccordionItemBody;
