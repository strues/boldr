/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import { Link2 } from '@boldr/icons';
import { stopPropagation } from '../../../utils/common';
import Option from '../../Option';

export type Props = {
  expanded: ?boolean,
  onExpandEvent: ?Function,
  doCollapse: ?Function,
  onChange: ?Function,
  config: ?Object,
};

class EmbeddedLayout extends Component {
  state: Object = {
    embeddedLink: '',
    height: this.props.config.defaultSize.height,
    width: this.props.config.defaultSize.width,
  };

  componentWillReceiveProps(props) {
    if (this.props.expanded && !props.expanded) {
      const { height, width } = this.props.config.defaultSize;
      this.setState({
        embeddedLink: '',
        height,
        width,
      });
    }
  }
  props: Props;
  updateValue: Function = (event: Object): void => {
    this.setState({
      [`${event.target.name}`]: event.target.value,
    });
  };

  onChange: Function = (event: Object): void => {
    const { onChange } = this.props;
    const { embeddedLink, height, width } = this.state;
    onChange(embeddedLink, height, width);
  };

  rendeEmbeddedLinkModal(): Object {
    const { embeddedLink, height, width } = this.state;
    const { config: { popupClassName }, doCollapse } = this.props;
    return (
      <div
        className={classNames('boldredit-embedded-modal', popupClassName)}
        onClick={stopPropagation}
      >
        <div className="boldredit-embedded-modal-header">
          <span className="boldredit-embedded-modal-header-option">
            Embedded Link
            <span className="boldredit-embedded-modal-header-label" />
          </span>
        </div>
        <div className="boldredit-embedded-modal-link-section">
          <input
            className="boldredit-embedded-modal-link-input"
            placeholder="Enter link"
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={embeddedLink}
            name="embeddedLink"
          />
          <div className="boldredit-embedded-modal-size">
            <input
              onChange={this.updateValue}
              onBlur={this.updateValue}
              value={height}
              name="height"
              className="boldredit-embedded-modal-size-input"
              placeholder="Height"
            />
            <input
              onChange={this.updateValue}
              onBlur={this.updateValue}
              value={width}
              name="width"
              className="boldredit-embedded-modal-size-input"
              placeholder="Width"
            />
          </div>
        </div>
        <span className="boldredit-embedded-modal-btn-section">
          <button
            className="boldredit-embedded-modal-btn"
            onClick={this.onChange}
            disabled={!embeddedLink || !height || !width}
          >
            Add
          </button>
          <button className="boldredit-embedded-modal-btn" onClick={doCollapse}>
            Cancel
          </button>
        </span>
      </div>
    );
  }

  render(): Object {
    const { config: { icon, className, title }, expanded, onExpandEvent } = this.props;
    return (
      <div
        className="boldredit-embedded-wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="boldredit-embedded-control"
      >
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
          title={title}
        >
          <Link2 color="#222" />
        </Option>
        {expanded ? this.rendeEmbeddedLinkModal() : undefined}
      </div>
    );
  }
}

export default EmbeddedLayout;
