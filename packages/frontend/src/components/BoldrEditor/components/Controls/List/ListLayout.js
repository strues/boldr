/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import { Outdent, Indent, ListUl, ListOl } from '@boldr/icons';
import Option from '../../Option';

export type Props = {
  config?: Object,
  onChange?: Function,
  currentState?: Object,
};

export default class ListLayout extends Component {
  options: Array = ['unordered', 'ordered', 'indent', 'outdent'];
  props: Props;
  toggleBlockType: Function = (blockType: string): void => {
    const { onChange } = this.props;
    onChange(blockType);
  };

  indent: Function = (): void => {
    const { onChange } = this.props;
    onChange('indent');
  };

  outdent: Function = (): void => {
    const { onChange } = this.props;
    onChange('outdent');
  };

  renderListElements(): Object {
    const { config, currentState: { listType } } = this.props;
    const { options, unordered, ordered, indent, outdent, className } = config;
    return (
      <div
        className={classNames('boldrui-editor__list-wrapper', className)}
        aria-label="boldrui-editor__list-control"
      >
        {options.indexOf('unordered') >= 0 &&
          <Option
            value="unordered"
            onClick={this.toggleBlockType}
            className={classNames(unordered.className)}
            active={listType === 'unordered'}
            title={unordered.title}
          >
            <ListUl color="#222" />
          </Option>}
        {options.indexOf('ordered') >= 0 &&
          <Option
            value="ordered"
            onClick={this.toggleBlockType}
            className={classNames(ordered.className)}
            active={listType === 'ordered'}
            title={ordered.title}
          >
            <ListOl color="#222" />
          </Option>}
        {options.indexOf('indent') >= 0 &&
          <Option
            onClick={this.indent}
            className={classNames(indent.className)}
            title={indent.title}
          >
            <Indent color="#222" />
          </Option>}
        {options.indexOf('outdent') >= 0 &&
          <Option
            onClick={this.outdent}
            className={classNames(outdent.className)}
            title={outdent.title}
          >
            <Outdent color="#222" />
          </Option>}
      </div>
    );
  }

  render(): Object {
    return this.renderListElements();
  }
}
