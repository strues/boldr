import React from 'react';
import kindOf from '../../../core/util/kindOf';

import TabPanel from '../TabPanel';

/**
 * tab panel
 * {
 *   title: 'xxx',
 *   disabled: false,
 *   key: 'xx',
 *   actived: false,
 *   content: ReactElement,
 *   panelClassName: 'xxx',
 *   tabClassName: 'xxx',
 *   onTabReady: func
 * }
 */

const tabUtil = {
  getTabListData(children, activeId) {
    const childrenList = React.Children.toArray(children);
    const listData = [];
    React.Children.forEach(childrenList, child => {
      if (this.checkIfTabPanel(child)) {
        const {
          id,
          disabled,
          tab,
          children: panelChildren,
          onTabReady,
          panelClassName,
          tabClassName,
        } = child.props;
        listData.push({
          title: tab || '',
          disabled: !!disabled,
          key: id,
          actived: activeId === id,
          content: panelChildren,
          panelClassName,
          tabClassName,
          onTabReady,
        });
      }
    });
    this.listData = listData;
    return listData;
  },

  checkIfTabPanel(rEl) {
    const type = rEl && rEl.type;
    return kindOf(type, TabPanel);
  },
};

export default tabUtil;
