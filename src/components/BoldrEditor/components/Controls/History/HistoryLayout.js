/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '@boldr/ui/Icons/Icon';
import { getFirstIcon } from '../../../utils/toolbar';
import Option from '../../Option';
import { Dropdown, DropdownOption } from '../../Dropdown';

export type Props = {
  expanded: ?boolean,
  onExpandEvent: ?Function,
  doExpand: ?Function,
  doCollapse: ?Function,
  onChange: ?Function,
  config: ?Object,
  currentState: ?Object,
};

export default class HistoryLayout extends Component {
  props: Props;
  onChange = obj => {
    const { onChange } = this.props;
    onChange(obj);
  };

  renderInDropDown(): Object {
    const {
      config,
      expanded,
      doExpand,
      onExpandEvent,
      doCollapse,
      currentState: { undoDisabled, redoDisabled },
    } = this.props;
    const { options, undo, redo, className, dropdownClassName, title } = config;
    return (
      <Dropdown
        className={classNames('boldrui-editor__history-dropdown', className)}
        optionWrapperClassName={classNames(dropdownClassName)}
        expanded={expanded}
        doExpand={doExpand}
        doCollapse={doCollapse}
        onExpandEvent={onExpandEvent}
        aria-label="boldrui-editor__history-control"
        title={title}
      >
        <Icon kind="history" color="#222" />
        {options.indexOf('undo') >= 0 &&
          <DropdownOption
            value="undo"
            onClick={this.onChange}
            disabled={undoDisabled}
            className={classNames('boldrui-editor__history-dropdownoption', undo.className)}
            title={undo.title}
          >
            <Icon kind="undo" color="#222" />
          </DropdownOption>}
        {options.indexOf('redo') >= 0 &&
          <DropdownOption
            value="redo"
            onClick={this.onChange}
            disabled={redoDisabled}
            className={classNames('boldrui-editor__history-dropdownoption', redo.className)}
            title={redo.title}
          >
            <Icon kind="redo" color="#222" />
          </DropdownOption>}
      </Dropdown>
    );
  }

  renderInFlatList(): Object {
    const {
      config: { options, undo, redo, className },
      currentState: { undoDisabled, redoDisabled },
    } = this.props;
    return (
      <div
        className={classNames('boldrui-editor__history-wrapper', className)}
        aria-label="boldrui-editor__history-control"
      >
        {options.indexOf('undo') >= 0 &&
          <Option
            value="undo"
            onClick={this.onChange}
            className={classNames(undo.className)}
            disabled={undoDisabled}
            title={undo.title}
          >
            <Icon kind="undo" color="#222" />
          </Option>}
        {options.indexOf('redo') >= 0 &&
          <Option
            value="redo"
            onClick={this.onChange}
            className={classNames(redo.className)}
            disabled={redoDisabled}
            title={redo.title}
          >
            <Icon kind="redo" color="#222" />
          </Option>}
      </div>
    );
  }

  render(): Object {
    const { config } = this.props;
    if (config.inDropdown) {
      return this.renderInDropDown();
    }
    return this.renderInFlatList();
  }
}
