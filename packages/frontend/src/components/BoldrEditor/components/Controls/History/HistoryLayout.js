/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import Undo from '@boldr/icons/Undo';
import Redo from '@boldr/icons/Redo';
import Option from '../../Option';

export type Props = {
  onChange: ?Function,
  config: Object,
  currentState: Object,
};

export default class HistoryLayout extends Component<Props, *> {
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
        className={classNames('boldr-editor-history__wrapper', className)}
        aria-label="boldr-editor-history__control"
      >
        <Option
          value="undo"
          onClick={this.onChange}
          className={classNames(undo.className)}
          disabled={undoDisabled}
          title={undo.title}
        >
          <Undo color="#222" />
        </Option>
        <Option
          value="redo"
          onClick={this.onChange}
          className={classNames(redo.className)}
          disabled={redoDisabled}
          title={redo.title}
        >
          <Redo color="#222" />
        </Option>
      </div>
    );
  }

  render(): Object {
    return this.renderHistoryIcons();
  }
}
