/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '@boldr/ui/Icons/Icon';
import { getFirstIcon } from '../../../utils/toolbar';
import Option from '../../Option';
import { Dropdown, DropdownOption } from '../../Dropdown';

export type Props = {
  expanded?: boolean,
  doExpand?: Function,
  doCollapse?: Function,
  onExpandEvent?: Function,
  config?: Object,
  onChange?: Function,
  currentState?: Object,
};
export default class InlineLayout extends Component {
  props: Props;
  renderInFlatList(): Object {
    const { config, currentState, onChange } = this.props;
    return (
      <div
        className={classNames('boldrui-editor__inline-wrapper')}
        aria-label="boldrui-editor__inline-control"
      >
        {config.options.map((style, index) =>
          <Option
            key={index}
            value={style}
            onClick={onChange}
            className={classNames(config[style].className)}
            active={currentState[style] === true || (style === 'MONOSPACE' && currentState.CODE)}
            title={config[style].title}
          >
            <Icon kind={style} color="#222" />
          </Option>,
        )}
      </div>
    );
  }

  renderInDropDown(): Object {
    const {
      config,
      expanded,
      doExpand,
      onExpandEvent,
      doCollapse,
      currentState,
      onChange,
    } = this.props;
    const { className, dropdownClassName, title } = config;
    return (
      <Dropdown
        className={classNames('boldrui-editor__inline-dropdown', className)}
        optionWrapperClassName={classNames(dropdownClassName)}
        onChange={onChange}
        expanded={expanded}
        doExpand={doExpand}
        doCollapse={doCollapse}
        onExpandEvent={onExpandEvent}
        aria-label="boldrui-editor__inline-control"
        title={title}
      >
        <img src={getFirstIcon(config)} alt="" />
        {config.options.map((style, index) =>
          <DropdownOption
            key={index}
            value={style}
            className={classNames('boldrui-editor__inline-dropdownoption', config[style].className)}
            active={currentState[style] === true || (style === 'MONOSPACE' && currentState.CODE)}
            title={config[style].title}
          >
            <img src={config[style].icon} alt="" />
          </DropdownOption>,
        )}
      </Dropdown>
    );
  }

  render(): Object {
    const { config: { inDropdown } } = this.props;
    if (inDropdown) {
      return this.renderInDropDown();
    }
    return this.renderInFlatList();
  }
}
