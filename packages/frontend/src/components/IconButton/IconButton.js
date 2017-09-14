import React from 'react';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';

import BoldrComponent from '../util/BoldrComponent';
import IconButtonLayout from './IconButtonLayout';

class IconButton extends BoldrComponent {
  static propTypes = {
    ...IconButtonLayout.propTypes,
    children: PropTypes.node,
    id: PropTypes.string,
    prefixIcon: PropTypes.node,
    suffixIcon: PropTypes.node,
    type: PropTypes.string,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
  };

  static defaultProps = IconButtonLayout.defaultProps;

  constructor(props) {
    super(props);
    this.addPrefix = this.addPrefix.bind(this);
    this.addSuffix = this.addSuffix.bind(this);
    this.addIcon = this.addIcon.bind(this);
  }

  addIcon(className, icon, height) {
    // eslint-disable-next-line
    const iconSize = height === 'small' ? '8px' : height === 'medium' ? '12px' : '16px';
    const dataHook =
      className === 'boldr-iconbtn-prefix' ? 'boldr-iconbtn-prefix' : 'boldr-iconbtn-suffix';
    return icon ? (
      <div className={className} data-hook={dataHook}>
        {React.cloneElement(icon, { size: iconSize })}
      </div>
    ) : null;
  }

  addPrefix() {
    return this.addIcon('boldr-iconbtn-prefix', this.props.prefixIcon, this.props.height);
  }

  addSuffix() {
    return this.addIcon('boldr-iconbtn-suffix', this.props.suffixIcon, this.props.height);
  }

  render() {
    const { disabled, onClick, children, type, onMouseEnter, onMouseLeave } = this.props;
    const buttonLayoutProps = omit(this.props, [
      'id',
      'onClick',
      'prefixIcon',
      'suffixIcon',
      'type',
    ]);

    return (
      <IconButtonLayout {...buttonLayoutProps}>
        <button
          onClick={onClick}
          disabled={disabled}
          type={type}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}>
          {this.addPrefix()}
          {children}
          {this.addSuffix()}
        </button>
      </IconButtonLayout>
    );
  }
}

IconButton.displayName = 'IconButton';

export default IconButton;
