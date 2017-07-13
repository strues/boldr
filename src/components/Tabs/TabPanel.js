/* @flow */
import React, { Component } from 'react';
import noop from 'lodash/noop';

export type Props = {
  className?: string,
  children: ReactChildren,
  prefix?: string,
  actived?: boolean,
  tab: any,
  id?: string | number,
  onPanelReady?: () => void,
  uniqueId?: number,
};
class TabPanel extends Component {
  static defaultProps = {
    prefix: 'boldrui',
    className: '',
    actived: false,
    onPanelReady: noop,
    uniqueId: 0,
  };

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const { onPanelReady, id } = this.props;
    onPanelReady(id);
  }
  props: Props;
  render() {
    const { actived } = this.props;
    const hiddenStyle = {};
    if (!actived) {
      hiddenStyle.display = 'none';
    }
    return (
      <div
        style={hiddenStyle}
        role="tabpanel"
        id={`${this.props.prefix}-tabpanel-${this.props.uniqueId}-${this.props.id}`}
        className={`${this.props.prefix}-tab-tabpanel ${this.props.className}`}
      >
        {this.props.children}
      </div>
    );
  }
}

export default TabPanel;
