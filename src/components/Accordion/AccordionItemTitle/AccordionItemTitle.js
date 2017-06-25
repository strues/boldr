/* @flow */
import React, { PureComponent } from 'react';

type Props = {
  id: string,
  expanded: boolean,
  onClick: () => void,
  ariaControls: string,
  children: ReactChildren,
  role: string,
};

class AccordionItemTitle extends PureComponent {
  static defaultProps = {
    id: '',
    expanded: false,
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
    const { id, expanded, ariaControls, onClick, children, role } = this.props;
    return (
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        id={id}
        aria-expanded={expanded}
        aria-controls={ariaControls}
        className="boldrui-accordion__title"
        onClick={onClick}
        role={role}
        onKeyPress={this.handleKeyPress}
      >
        {children}
      </div>
    );
  }
}
AccordionItemTitle.accordionElementName = 'AccordionItemTitle';

export default AccordionItemTitle;
