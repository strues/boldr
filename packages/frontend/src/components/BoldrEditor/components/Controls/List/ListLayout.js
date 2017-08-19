/* @flow */
import * as React from 'react';
import classNames from 'classnames';
import { ListUl, ListOl } from '@boldr/icons';
import Option from '../../Option';
import { ControlWrapper } from '../Controls.styled';

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

  renderListElements(): React.Node {
    const { config, currentState: { listType } } = this.props;
    const { unordered, ordered, className } = config;
    return (
      <ControlWrapper className={className} aria-label="be-list__control">
        <Option
          value="unordered"
          onClick={this.toggleBlockType}
          className={classNames(unordered.className)}
          active={listType === 'unordered'}
          title={unordered.title}
        >
          <ListUl color="#222" />
        </Option>
        <Option
          value="ordered"
          onClick={this.toggleBlockType}
          className={classNames(ordered.className)}
          active={listType === 'ordered'}
          title={ordered.title}
        >
          <ListOl color="#222" />
        </Option>
      </ControlWrapper>
    );
  }

  render(): React.Node {
    return this.renderListElements();
  }
}
