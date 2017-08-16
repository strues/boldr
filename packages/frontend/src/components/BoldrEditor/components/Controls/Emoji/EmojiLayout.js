/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import Smile from '@boldr/icons/Smile';
import uniqueId from 'lodash/uniqueId';
import Dialog from '@boldr/ui/Dialog';
import Option from '../../Option';

export type Props = {
  onChange: Function,
  expanded?: boolean,
  config: Object,
};

class EmojiLayout extends Component {
  state = {
    showModal: false,
  };
  props: Props;
  onChange: Function = (event: Object): void => {
    const { onChange } = this.props;
    onChange(event.target.innerHTML);
  };
  openModal: Function = (): void => {
    this.setState({
      showModal: true,
    });
  };
  hideModal: Function = (): void => {
    this.setState({
      showModal: false,
    });
  };
  renderEmojiModal(): Object {
    return (
      <Dialog title="Add Emoji" isVisible={this.state.showModal} onClose={this.hideModal}>
        <div className={classNames('boldredit-emoji-modal')}>
          {this.props.config.emojis.map(emoji =>
            <span key={uniqueId()} className="boldredit-emoji-icon" alt="" onClick={this.onChange}>
              {emoji}
            </span>,
          )}
        </div>
      </Dialog>
    );
  }

  render(): Object {
    const { expanded } = this.props;
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
          onClick={this.openModal}
        >
          <Smile color="#222" />
        </Option>
        {this.renderEmojiModal()}
      </div>
    );
  }
}

export default EmojiLayout;
