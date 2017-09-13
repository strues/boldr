/* @flow */
import React from 'react';
import type { Node } from 'react';
import cn from 'classnames';
import { List, ListOl } from '@boldr/icons';
import Option from '../../Option';

export type Props = {
  config: Object,
  onChange?: Function,
  currentState: Object,
};

export default class ListLayout extends React.PureComponent<Props, *> {
  static displayName = 'ListLayout';
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

  renderListElements() {
    const { config, currentState: { listType } } = this.props;
    const { unordered, ordered, className } = config;
    return (
      <div className={cn('be-ctrl__group', className)} aria-label="be-list-control">
        <Option
          value="unordered"
          onClick={this.toggleBlockType}
          className={cn(unordered.className)}
          active={listType === 'unordered'}
          title={unordered.title}>
          <List color="#222" />
        </Option>
        <Option
          value="ordered"
          onClick={this.toggleBlockType}
          className={cn(ordered.className)}
          active={listType === 'ordered'}
          title={ordered.title}>
          <ListOl fill="#222" />
        </Option>
      </div>
    );
  }

  render(): Node {
    return this.renderListElements();
  }
}
