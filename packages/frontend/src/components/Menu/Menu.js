import React from 'react';
import PropTypes from 'prop-types';
import BoldrComponent from '../util/BoldrComponent';
import Tooltip from '../Tooltip';
import IconButton from '../IconButton';
import Icon from '../Icons/Icon';
import MenuItem from './MenuItem';

class Menu extends BoldrComponent {
  static propTypes = {
    isSize: PropTypes.string,
    placement: Tooltip.propTypes.placement,
    buttonTheme: IconButton.propTypes.theme,
  };

  static defaultProps = {
    isSize: 'normal',
    placement: 'top',
    buttonTheme: 'icon-standard',
  };

  render() {
    const menuItems = React.Children.map(this.props.children, (child, i) => {
      const { onClick, ...passThroughProps } = child.props;
      const onClickWithHide = () => {
        this.tooltip.hide();
        onClick();
      };
      return <MenuItem {...passThroughProps} onClick={onClickWithHide} key={i} />;
    });

    const tooltipContent = <ul className="boldr-menu">{menuItems}</ul>;

    return (
      <Tooltip
        ref={tooltip => {
          this.tooltip = tooltip;
        }}
        placement={this.props.placement}
        alignment="center"
        content={tooltipContent}
        showTrigger="click"
        hideTrigger="click"
        theme="light"
        isSize={this.props.isSize}
        shouldCloseOnClickOutside>
        <IconButton type="button" height="medium" theme={this.props.buttonTheme}>
          <Icon kind="more-vert" color="#222" />
        </IconButton>
      </Tooltip>
    );
  }
}

export default Menu;
