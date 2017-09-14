/* @flow */
import React from 'react';
import type { Node } from 'react';
import uniqueId from 'lodash/uniqueId';

type Props = {
  isExpanded?: boolean,
  isAccordion?: boolean,
  onClick: Function,
  children: Array<Node>,
};

type State = {
  itemUuid: string,
};

class AccordionItem extends React.Component<Props, State> {
  static defaultProps = {
    isAccordion: true,
    isExpanded: false,
    onClick: () => {},
  };
  constructor() {
    super();

    this.state = {
      itemUuid: uniqueId(),
    };
  }
  props: Props;
  renderChildren = () => {
    const { isAccordion, isExpanded, onClick, children } = this.props;
    const { itemUuid } = this.state;

    return React.Children.map(children, item => {
      const itemProps = {};

      if (item.type.accordionElementName === 'AccordionItemTitle') {
        itemProps.isExpanded = isExpanded;
        itemProps.key = 'title';
        itemProps.id = `boldr-accordion__title-${itemUuid}`;
        itemProps.ariaControls = `boldr-accordion__body-${itemUuid}`;
        itemProps.onClick = onClick;
        itemProps.role = isAccordion ? 'tab' : 'button';

        return React.cloneElement(item, itemProps);
      } else if (item.type.accordionElementName === 'AccordionItemBody') {
        itemProps.isExpanded = isExpanded;
        itemProps.key = 'body';
        itemProps.id = `boldr-accordion__body-${itemUuid}`;
        itemProps.role = isAccordion ? 'tabpanel' : '';

        return React.cloneElement(item, itemProps);
      }

      return item;
    });
  };

  render() {
    return <div className="boldr-accordion__item">{this.renderChildren()}</div>;
  }
}

export default AccordionItem;
