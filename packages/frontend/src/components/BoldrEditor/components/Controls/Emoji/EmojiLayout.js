/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '@boldr/ui/Icons/Icon';
import shortid from 'shortid';
import { stopPropagation } from '../../../utils/common';
import Option from '../../Option';

export type Props = {
  onChange: Function,
  expanded?: boolean,
  onExpandEvent?: Function,
  config: Object,
};

class EmojiLayout extends Component {
  props: Props;
  onChange: Function = (event: Object): void => {
    const { onChange } = this.props;
    onChange(event.target.innerHTML);
  };

  renderEmojiModal(): Object {
    return (
      <div
        className={classNames('boldredit-emoji-modal', this.props.config.popupClassName)}
        onClick={stopPropagation}
      >
        {this.props.config.emojis.map(emoji =>
          <span
            key={shortid.generate()}
            className="boldredit-emoji-icon"
            alt=""
            onClick={this.onChange}
          >
            {emoji}
          </span>,
        )}
      </div>
    );
  }

  render(): Object {
    const { expanded, onExpandEvent } = this.props;
    return (
      <div
        className="boldredit-emoji-wrapper"
        aria-haspopup="true"
        aria-label="boldredit-emoji-control"
        aria-expanded={expanded}
        title={this.props.config.title}
      >
        <Option
          className={classNames(this.props.config.className)}
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
