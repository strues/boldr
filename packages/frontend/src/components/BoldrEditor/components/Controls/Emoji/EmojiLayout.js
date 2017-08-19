/* eslint-disable react/no-array-index-key */
/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import Smile from '@boldr/icons/Smile';
import { stopPropagation } from '../../../utils/common';
import type { EmojiConfig } from '../../../core/config';
import Option from '../../Option';
import { ControlWrapper } from '../Controls.styled';
import { EmojiModal, EmojiIcon } from './Emoji.styled';

export type Props = {
  onChange: Function,
  expanded?: boolean,
  onExpandEvent: Function,
  config: EmojiConfig,
};

class EmojiLayout extends React.Component<Props, *> {
  onChange: Function = (event: Object): void => {
    const { onChange } = this.props;
    onChange(event.target.innerHTML);
  };

  renderEmojiModal(): Object {
    const { config: { modalClassName, emojis } } = this.props;
    return (
      <EmojiModal className={modalClassName} onClick={stopPropagation}>
        {emojis.map((emoji, index) =>
          <EmojiIcon key={index} alt="emoji" onClick={this.onChange}>
            {emoji}
          </EmojiIcon>,
        )}
      </EmojiModal>
    );
  }

  render(): Object {
    const { config: { className, title }, expanded, onExpandEvent } = this.props;
    return (
      <ControlWrapper
        aria-haspopup="true"
        aria-label="be-emoji__control"
        aria-expanded={expanded}
        title={title}
      >
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
        >
          <Smile color="#222" />
        </Option>
        {expanded ? this.renderEmojiModal() : undefined}
      </ControlWrapper>
    );
  }
}

export default EmojiLayout;
