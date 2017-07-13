/* @flow */
import React, { Component } from 'react';
import noop from 'lodash/noop';

export type Props = {
  prefix?: string,
  children: ReactChildren,
  actived?: boolean,
  disabled?: boolean,
  id?: string | number,
  minWidth?: string,
  onSelected?: Function,
  onDelete?: Function,
  candel?: boolean,
  uniqueId?: number,
};

class Tab extends Component {
  static defaultProps = {
    prefix: 'boldrui',
    actived: false,
    disabled: false,
    id: '',
    minWidth: '',
    onSelected: noop,
    onDelete: noop,
    candel: false,
  };
  props: Props;
  onDel = e => {
    e.stopPropagation();
    const { onDelete, id } = this.props;
    onDelete(id);
  };

  onClick = () => {
    const { onSelected, id, actived, disabled } = this.props;
    if (!actived && !disabled) {
      onSelected(id);
    }
  };

  renderDelOperater() {
    const { candel, prefix } = this.props;
    if (candel) {
      return (
        <span className={`${prefix}-tabs-tab-inner-del`} onClick={this.onDel}>
          ✕
        </span>
      );
    }
    return '';
  }

  render() {
    const { actived, disabled, prefix, minWidth } = this.props;
    let classes = `${prefix}-tabs-tab`;
    if (actived) {
      classes += ` ${prefix}-tabs-actived`;
    }
    if (disabled) {
      classes += ` ${prefix}-tabs-disabled`;
    }
    const style = {};
    if (minWidth) {
      style.minWidth = minWidth;
    }
    return (
      <div
        role="tab"
        aria-labelledby={`${this.props.prefix}-tabpanel-${this.props.uniqueId}-${this.props.id}`}
        className={classes}
        aria-disabled={this.props.disabled}
        aria-selected={this.props.actived}
        onClick={this.onClick}
        style={style}
      >
        <div className={`${prefix}-tabs-tab-inner`}>
          {this.renderDelOperater()}
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Tab;
