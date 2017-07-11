/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../../../../Icons/Icon';
import { stopPropagation } from '../../../../utils/common';
import Option from '../../../Option';

class LayoutComponent extends Component {
  static propTypes: Object = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
  };

  onChange: Function = (event: Object): void => {
    const { onChange } = this.props;
    onChange(event.target.innerHTML);
  };

  renderEmojiModal(): Object {
    const { config: { popupClassName, emojis } } = this.props;
    return (
      <div
        className={classNames('boldr-editor__emoji-modal', popupClassName)}
        onClick={stopPropagation}
      >
        {emojis.map((emoji, index) =>
          <span key={index} className="boldr-editor__emoji-icon" alt="" onClick={this.onChange}>
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
        className="boldr-editor__emoji-wrapper"
        aria-haspopup="true"
        aria-label="boldr-editor__emoji-control"
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

export default LayoutComponent;

// todo: unit test cases
