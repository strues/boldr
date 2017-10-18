/* eslint-disable react/no-array-index-key */
/* @flow */

import React from 'react';
import type { Node } from 'react';
import cn from 'classnames';
import { Smile } from '../../Icons';
import { stopPropagation } from '../../../utils/common';
import type { EmojiConfig } from '../../../core/config';
import Option from '../../Option';

export type Props = {
  onChange: Function,
  expanded?: boolean,
  onExpandEvent: Function,
  config: EmojiConfig,
};

class EmojiLayout extends React.Component<Props, *> {
  onChange: Function = (event: SyntheticEvent<>): void => {
    const { onChange } = this.props;
    onChange(event.target.innerHTML);
  };

  renderEmojiModal(): Node {
    const { config: { modalClassName, emojis } } = this.props;
    return (
      <div className={cn('be-modal be-emoji', modalClassName)} onClick={stopPropagation}>
        {emojis.map((emoji, index) => (
          <span className={cn('be-emoji__icon')} key={index} alt="emoji" onClick={this.onChange}>
            {emoji}
          </span>
        ))}
      </div>
    );
  }

  render(): Node {
    const { config: { className, title }, expanded, onExpandEvent } = this.props;
    return (
      <div
        className={cn('be-ctrl__group', className)}
        aria-haspopup="true"
        aria-label="be-emoji__control"
        aria-expanded={expanded}
        title={title}>
        <Option className={cn(className)} value="unordered-list-item" onClick={onExpandEvent}>
          <Smile size={20} fill="#222" />
        </Option>
        {expanded ? this.renderEmojiModal() : undefined}
      </div>
    );
  }
}

export default EmojiLayout;
