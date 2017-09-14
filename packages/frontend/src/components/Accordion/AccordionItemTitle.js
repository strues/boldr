/* @flow */
import React from 'react';
import type { Node } from 'react';
import cn from 'classnames';

type Props = {
  id: string,
  isExpanded: boolean,
  onClick: Function,
  ariaControls?: string,
  children: Array<Node>,
  role: string,
  className?: string,
  hideBodyClassName?: string,
};

class AccordionItemTitle extends React.Component<Props, void> {
  static defaultProps = {
    id: '',
    isExpanded: false,
    onClick: () => {},
    ariaControls: '',
    role: '',
  };

  handleKeyPress = (e: Event) => {
    const { onClick } = this.props;
    if (e.charCode === 13 || e.charCode === 32) {
      onClick();
    }
  };
  props: Props;
  render() {
    const {
      id,
      isExpanded,
      ariaControls,
      onClick,
      children,
      className,
      role,
      hideBodyClassName,
    } = this.props;
    const titleClassName = cn('boldr-accordion__title', className, {
      [hideBodyClassName]: hideBodyClassName && !isExpanded,
    });

    return (
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        id={id}
        aria-expanded={isExpanded}
        aria-controls={ariaControls}
        className={titleClassName}
        onClick={onClick}
        role={role}
        tabIndex="0"
        onKeyPress={this.handleKeyPress}>
        {children}
      </div>
    );
  }
}

export default AccordionItemTitle;
