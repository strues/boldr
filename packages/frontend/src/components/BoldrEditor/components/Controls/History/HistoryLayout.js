/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '@boldr/ui/Icons/Icon';
import Option from '../../Option';

export type Props = {
  onChange: ?Function,
  config: Object,
  currentState: Object,
};

export default class HistoryLayout extends Component {
  props: Props;
  onChange = obj => {
    const { onChange } = this.props;
    onChange(obj);
  };

  renderHistoryIcons(): Object {
    const {
      config: { undo, redo, className },
      currentState: { undoDisabled, redoDisabled },
    } = this.props;
    return (
      <div
        className={classNames('boldrui-editor__history-wrapper', className)}
        aria-label="boldrui-editor__history-control"
      >
        <Option
          value="undo"
          onClick={this.onChange}
          className={classNames(undo.className)}
          disabled={undoDisabled}
          title={undo.title}
        >
          <Icon kind="undo" color="#222" />
        </Option>
        <Option
          value="redo"
          onClick={this.onChange}
          className={classNames(redo.className)}
          disabled={redoDisabled}
          title={redo.title}
        >
          <Icon kind="redo" color="#222" />
        </Option>
      </div>
    );
  }

  render(): Object {
    return this.renderHistoryIcons();
  }
}
