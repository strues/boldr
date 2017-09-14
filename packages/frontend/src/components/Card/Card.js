// @flow
import React from 'react';
import type { Node } from 'react';
import cn from 'classnames';

import getField from '../util/getField';
import Paper from '../Paper/Paper';
import Collapse from '../util/Collapse';
import contextTypes from './contextTypes';

export type ExpanderTooltipPosition = 'top' | 'right' | 'bottom' | 'left';
export type CardProps = {
  // An optional style to apply.
  style?: Object,
  // An optional className to apply to the card.
  className?: string,
  // Any Card parts that should be rendered.
  children?: Array<Node>,
  // Boolean if the card is expanded by default when there is an expander component
  defaultExpanded?: boolean,
  // Boolean if the card should raise on hover when on a desktop display.
  raise?: boolean,
  // Boolean if the card is currently expanded. This will require the `onExpanderClick` function
  // to toggle the state. The card will become controlled if this is not `undefined`.
  expanded?: boolean,
  //  An optional function to call when the expander is clicked.
  onExpanderClick?: Function,
  // The icon className to use for the expander icon.
  expanderIconClassName?: string,
  // Any icon children required for the expander icon.
  expanderIconChildren?: Node,
  // The tooltip position for the expander icon.
  expanderTooltipPosition?: ExpanderTooltipPosition,
  // The optional tooltip to display for the expander icon.
  expanderTooltipLabel?: Node,
  // An optional delay before the tooltip appears for the expander icon on hover.
  expanderTooltipDelay?: number,

  /**
     * Boolean if the card contains a table. It will update the styling accordingly.
     * When using the `DataTable` component, do not wrap it in a `CardText` component.
     *
     * ```js
     * <Card tableCard={true}>
     *   <CardTitle title="Example />
     *   <DataTable>
     *     ...
     *   </DataTable>
     * </Card>
     * ```
     */
  tableCard?: boolean,
  //  An optional function to call when the mouseover event is triggered
  onMouseOver?: Function,
  //  An optional function to call when the mouseleave event is triggered.
  onMouseLeave?: Function,
  // An optional function to call when the touchstart event is triggered.
  onTouchStart?: Function,
  //  Boolean if the card expansion should be animated.
  animate?: boolean,
};
export default class Card extends React.PureComponent<CardProps, *> {
  static defaultProps = {
    animate: true,
    expanderIconChildren: 'keyboard_arrow_down',
    expanderIconClassName: 'material-icons',
    expanderTooltipPosition: 'left',
  };

  static childContextTypes = contextTypes;

  constructor(props: CardProps) {
    super(props);

    this.state = {
      zDepth: 1,
      expanded: !!props.defaultExpanded,
    };
  }

  getChildContext() {
    const {
      expanderTooltipLabel,
      expanderTooltipDelay,
      expanderTooltipPosition,
      expanderIconClassName,
      expanderIconChildren,
    } = this.props;

    const expanded = getField(this.props, this.state, 'expanded');

    return {
      expanded,
      onExpandClick: this._handleExpandClick,
      iconClassName: typeof iconClassName !== 'undefined' ? iconClassName : expanderIconClassName,
      iconChildren: typeof iconChildren !== 'undefined' ? iconChildren : expanderIconChildren,
      tooltipLabel: expanderTooltipLabel,
      tooltipDelay: expanderTooltipDelay,
      tooltipPosition: expanderTooltipPosition,
    };
  }

  props: CardProps;
  _touched: boolean;

  _handleMouseOver = (e: SyntheticEvent<>) => {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }

    if (this.props.raise && !this._touched) {
      this.setState({ zDepth: 4 });
    }
  };

  _handleMouseLeave = (e: SyntheticEvent<>) => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }

    this._touched = false;
    if (this.props.raise && this.state.zDepth !== 1) {
      this.setState({ zDepth: 1 });
    }
  };

  _handleTouchStart = (e: SyntheticEvent<>) => {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e);
    }

    this._touched = true;
  };

  _handleExpandClick = (e: SyntheticEvent<>) => {
    const { onExpanderClick } = this.props;
    const expanded = !getField(this.props, this.state, 'expanded');
    if (onExpanderClick) {
      onExpanderClick(expanded, e);
    }

    if (typeof this.props.expanded === 'undefined') {
      this.setState({ expanded });
    }
  };

  render(): Node {
    const { zDepth } = this.state;
    const {
      className,
      raise,
      tableCard,
      children,
      animate,
      /* eslint-disable no-unused-vars */
      expanded: propExpanded,
      onExpanderClick,
      defaultExpanded,
      expanderIconChildren,
      expanderIconClassName,
      expanderTooltipLabel,
      expanderTooltipDelay,
      expanderTooltipPosition,
      ...props
    } = this.props;

    const expanded = getField(this.props, this.state, 'expanded');
    let expanderIndex = -1;
    const parts = React.Children.map(React.Children.toArray(children), (child, i) => {
      if (!child || !child.props) {
        return child;
      } else if (expanderIndex < 0 && (child.props.isExpander || child.props.expander)) {
        expanderIndex = i;
      }

      if (!child.props.expandable) {
        return child;
      }

      const collapsed = expanderIndex === -1 || expanderIndex === i || !expanded;
      return (
        <Collapse collapsed={collapsed} animate={animate}>
          {child}
        </Collapse>
      );
    });

    return (
      <Paper
        {...props}
        zDepth={zDepth}
        className={cn(
          'boldr-card',
          {
            'boldr-card--raise': raise,
            'boldr-card--table': tableCard,
          },
          'boldr-background--card',
          className,
        )}
        onMouseOver={this._handleMouseOver}
        onMouseLeave={this._handleMouseLeave}
        onTouchStart={this._handleTouchStart}
        isPadded={false}>
        <div className="boldr-card__inner">{parts}</div>
      </Paper>
    );
  }
}
