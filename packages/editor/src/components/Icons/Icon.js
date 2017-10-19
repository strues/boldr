import React from 'react';

const reduceProps = (props, reducers) =>
  Object.keys(reducers).reduce(
    (o, k) => {
      if (o[k]) {
        const reducer = reducers[k];
        const value = typeof reducer === 'function' ? reducer(o) : reducer;
        delete o[k];
        return {
          ...o,
          ...value,
          ...(value &&
            value.style && {
              style: {
                ...o.style,
                ...value.style,
              },
            }),
        };
      }
      return o;
    },
    { ...props },
  );

const Icon = props => {
  const { name, className, defaultClassName, size, ...rest } = reduceProps(props, Icon.mapProps);

  return (
    <svg
      className={`${defaultClassName} ${defaultClassName}--${name}${className
        ? ` ${className}`
        : ''}`}
      {...rest}
      {...size && { width: size, height: size }}
    />
  );
};

Icon.defaultProps = { defaultClassName: 'Icon', fill: 'currentColor' };

Icon.mapProps = {
  center: {
    style: {
      verticalAlign: 'middle',
      position: 'relative',
      top: 'calc(-1em * 1/6)',
    },
  },
  text: { size: '1.2em' },
};

export default Icon;
