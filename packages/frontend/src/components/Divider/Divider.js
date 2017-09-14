/* @flow */
import React from 'react';
import cn from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';

export type DividerProps = {
  /**
   * An optional inline-style to apply to the overlay.
   */
  style?: Object,
  /**
   * An optional css className to apply.
   */
  className?: string,
  /**
   *  Boolean if this divider should be inset relative to it's container
   */
  inset?: boolean,
  /**
   * Boolean if the divider should be vertical instead of horizontal.
   */
  vertical?: boolean,
};

const BASE_ELEMENT = StyleClasses.DIVIDER;
/**
 * The divider component will pass all other props such as style or
 * event listeners on to the component.
 */
class Divider extends React.PureComponent<DividerProps, *> {
  render() {
    const { className, inset, vertical, ...props } = this.props;

    const Component = vertical ? 'div' : 'hr';

    return (
      <Component
        {...props}
        className={cn(
          BASE_ELEMENT,
          {
            'boldr-divider__vertical': vertical,
            'boldr-divider__inset': inset,
          },
          className,
        )}
      />
    );
  }
}

export default Divider;
