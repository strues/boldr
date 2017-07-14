/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '@boldr/ui/Icons/Icon';
import { stopPropagation } from '../../../utils/common';
import Option from '../../Option';

export type Props = {
  onChange: Function,
  editorState: Object,
  modalHandler?: Object,
  expanded?: boolean,
  onExpandEvent?: Function,
  config?: Object,
};

class EmojiLayout extends Component {
  props: Props;
  onChange: Function = (event: Object): void => {
    const { onChange } = this.props;
    onChange(event.target.innerHTML);
  };

  renderEmojiModal(): Object {
    const { config: { popupClassName, emojis } } = this.props;
    return (
      <div
        className={classNames('boldrui-editor__emoji-modal', popupClassName)}
        onClick={stopPropagation}
      >
        {emojis.map((emoji, index) =>
          <span key={index} className="boldrui-editor__emoji-icon" alt="" onClick={this.onChange}>
            {emoji}
          </span>,
        )}
      </div>
    );
  }

  render(): Object {
    const { config: { icon, className, title }, expanded, onExpandEvent } = this.props;
    return (
      <div
        className="boldrui-editor__emoji-wrapper"
        aria-haspopup="true"
        aria-label="boldrui-editor__emoji-control"
        aria-expanded={expanded}
        title={title}
      >
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
        >
          <Icon kind="emoji" color="#222" />
        </Option>
        {expanded ? this.renderEmojiModal() : undefined}
      </div>
    );
  }
}

export default EmojiLayout;
