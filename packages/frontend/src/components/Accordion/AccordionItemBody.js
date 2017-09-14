/* @flow */
import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';

type Props = {
  id: string,
  isExpanded: boolean,
  children: Array<Node>,
  className: string,
  hideBodyClassName: string,
  role: string,
};

const defaultProps = {
  isExpanded: false,
  className: 'boldr-accordion__body',
  hideBodyClassName: 'boldr-accordion__body--hidden',
};

const AccordionItemBody = ({
  id,
  isExpanded,
  children,
  className,
  hideBodyClassName,
  role,
}: Props) => {
  const bodyClass = classNames(className, {
    [hideBodyClassName]: !isExpanded,
  });
  const ariaHidden = !isExpanded;
  return (
    <div id={id} className={bodyClass} aria-hidden={ariaHidden} role={role}>
      {children}
    </div>
  );
};

AccordionItemBody.defaultProps = defaultProps;
AccordionItemBody.accordionElementName = 'AccordionItemBody';

export default AccordionItemBody;
