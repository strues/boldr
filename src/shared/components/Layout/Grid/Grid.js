import React from 'react';
import classNames from 'classnames';

export type Props = {
  fluid?: boolean,
  className?: string,
  style?: Object,
  children?: number | string | React.Element | Array<any>,
  componentClass: ?string,
};

const Grid = ({ fluid, className, style, children, componentClass }: Props) => {
  const ComponentClass = componentClass;

  const classes = classNames(
    {
      grid: !fluid,
      grid__fluid: fluid,
    },
    className,
  );

  return (
    <ComponentClass className={classes} style={style}>
      {children}
    </ComponentClass>
  );
};

Grid.defaultProps = {
  componentClass: 'div',
};

export default Grid;
