/* eslint-disable react/prefer-stateless-function, no-unused-vars */
// @flow
import React from 'react';
import type { Node } from 'react';
import cn from 'classnames';

import CardExpander from './CardExpander';

/**
 * The `CardActions` component is used for adding actions on your card.
 * The actions should be `FlatButton`s or `IconButton`s.
 *
 * This component can act as a `CardExpander`.
 */

export type CardActionsProps = {
  // Boolean if this component should act as an expander and inject the `CardExpander`
  expander?: boolean,
  // An optional className to apply to the actions container.
  className?: string,
  // An actions to display.
  children?: Array<Node>,
  // Boolean if the actions should be centered.
  centered?: boolean,
  // Boolean if the actions should be stacked.
  stacked?: boolean,
};
export default class CardActions extends React.PureComponent<CardActionsProps, *> {
  props: CardActionsProps;

  render() {
    const { className, children, expander, centered, stacked, ...props } = this.props;
    return (
      <section
        {...props}
        className={cn(
          'boldr-card__footer',
          {
            'boldr-card__footer--inline': !stacked,
            'boldr-card__footer--stacked': stacked,
            'boldr-card__footer--centered': centered,
          },
          className,
        )}>
        {children}
        {expander && <CardExpander />}
      </section>
    );
  }
}
