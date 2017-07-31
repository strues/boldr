import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BoldrComponent from '../UiHelpers/BoldrComponent';

class Tag extends BoldrComponent {
  static propTypes = {
    children: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    thumb: PropTypes.element,
    onRemove: PropTypes.func,
    removable: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'large']),
    wrap: PropTypes.bool,
    disabled: PropTypes.bool,
  };
  static defaultProps = {
    onRemove: () => {},
    size: 'small',
    removable: true,
  };
  render() {
    const { id, children, thumb, removable, onRemove, size, wrap, disabled } = this.props;

    const className = classNames({
      'boldrui-tag': true,
      'boldrui-tag__lg': size === 'large',
      'boldrui-tag__wrap': wrap,
      'boldrui-tag__disabled': disabled,
    });

    const innerClassName = classNames({
      'boldrui-tag__inner-wrap': wrap,
      'boldrui-typo-4': true,
    });

    const title = wrap ? children : '';

    return (
      <span className={className} disabled={disabled} id={id} title={title}>
        {thumb &&
          <span className="boldrui-tag__thumb">
            {thumb}
          </span>}
        <span className={innerClassName}>
          {children}
        </span>
        {removable &&
          !disabled &&
          <a
            className="boldrui-tag__remove--btn"
            onClick={() => onRemove(id)}
            onKeyPress={() => onRemove(id)}
          />}
      </span>
    );
  }
}

export default Tag;
