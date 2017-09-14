// @flow
import React from 'react';
import type { Node } from 'react';
import cn from 'classnames';
import BoldrComponent from '../util/BoldrComponent';

export type Props = {
  children: string,
  id: string,
  thumb?: Node,
  onRemove: Function,
  removable?: boolean,
  // small or large
  size?: string,
  wrap?: boolean,
  disabled?: boolean,
};

class Tag extends BoldrComponent {
  static defaultProps = {
    onRemove: () => {},
    size: 'small',
    removable: true,
  };
  props: Props;
  render(): Node {
    const { id, children, thumb, removable, onRemove, size, wrap, disabled } = this.props;

    const className = cn({
      'boldr-tag': true,
      'boldr-tag__lg': size === 'large',
      'boldr-tag__wrap': wrap,
      'boldr-tag__disabled': disabled,
    });

    const innerClassName = cn({
      'boldr-tag__inner-wrap': wrap,
      'boldr-typo-4': true,
    });

    const title = wrap ? children : '';

    return (
      <span className={className} disabled={disabled} id={id} title={title}>
        {thumb && <span className="boldr-tag__thumb">{thumb}</span>}
        <span className={innerClassName}>{children}</span>
        {removable &&
          !disabled && (
            // eslint-disable-next-line
            <a
              className="boldr-tag__remove--btn"
              onClick={() => onRemove(id)}
              onKeyPress={() => onRemove(id)}
            />
          )}
      </span>
    );
  }
}

export default Tag;
