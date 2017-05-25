/* @flow */
import React, { Component } from 'react';
import uuid from 'uuid';

type Props = {
  expanded: boolean,
  accordion: boolean,
  onClick: () => void,
  children: ReactChildren,
  className: string,
};

class AccordionItem extends Component {
  static defaultProps = {
    accordion: true,
    expanded: false,
    onClick: () => {},
    className: 'boldrui-accordion__item',
  };
  constructor(props) {
    super(props);
    this.state = {
      itemUuid: uuid.v4(),
    };
    this.renderChildren = this.renderChildren.bind(this);
  }
  props: Props;
  renderChildren() {
    const { accordion, expanded, onClick, children } = this.props;
    const { itemUuid } = this.state;

    return React.Children.map(children, item => {
      const itemProps = {
        expanded,
      };

      if (item.type.accordionElementName === 'AccordionItemTitle') {
        itemProps.key = 'title';
        itemProps.id = `boldrui-accordion__title-${itemUuid}`;
        itemProps.ariaControls = `boldrui-accordion__body-${itemUuid}`;
        itemProps.onClick = onClick;
        itemProps.role = accordion ? 'tab' : 'button';
      } else if (item.type.accordionElementName === 'AccordionItemBody') {
        itemProps.key = 'body';
        itemProps.id = `boldrui-accordion__body-${itemUuid}`;
        itemProps.role = accordion ? 'tabpanel' : '';
      }

      return React.cloneElement(item, itemProps);
    });
  }

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        {this.renderChildren()}
      </div>
    );
  }
}

export default AccordionItem;
