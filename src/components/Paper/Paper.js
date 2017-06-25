/* @flow */
import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

type Props = {
  //  The component to render the paper as.
  component: Function | string,
  //  An optional css className to apply.
  className: ?string,
  // The depth of the paper. This should be a number between 0 - 5. If
  // the depth is 0, it will raise to a depth of 3 on hover.
  zDepth: number,
  // Any children to display in the paper.
  children: ReactChildren,
  //  Boolean if the paper should raise to the `zDepth` of `3`
  //  on hover when the initial
  raiseOnHover: boolean,
  // whether we apply a border raidus or not.
  rounded: boolean,
};

const Paper = (props: Props) => {
  const { component: Component, zDepth, className, raiseOnHover, rounded, ...rest } = props;

  return (
    <Component
      {...rest}
      className={cn(
        `boldrui-paper boldrui-paper__${zDepth}`,
        {
          'boldrui-paper__0-hover': zDepth === 0 && raiseOnHover,
          'boldrui-paper__round': rounded,
        },
        className,
      )}
    />
  );
};
const defaultProps = {
  zDepth: 1,
  component: 'div',
  rounded: false,
};

Paper.defaultProps = defaultProps;
export default Paper;
