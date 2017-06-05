/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '~components/Icons';
import { stopPropagation } from '../../../../utils/common';
import Option from '../../../Option';

export type Props = {
  expanded: boolean,
  onExpandEvent: Function,
  doCollapse: Function,
  onChange: Function,
  config: Object,
};

class LayoutComponent extends Component {
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
        className={classNames('boldr-editor__embedded-modal', popupClassName)}
        onClick={stopPropagation}
      >
        <div className="boldr-editor__embedded-modal-header">
          <span className="boldr-editor__embedded-modal-header-option">
            Embedded Link
            <span className="boldr-editor__embedded-modal-header-label" />
          </span>
        </div>
        <div className="boldr-editor__embedded-modal-link-section">
          <input
            className="boldr-editor__embedded-modal-link-input"
            placeholder="Enter link"
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={embeddedLink}
            name="embeddedLink"
          />
          <div className="boldr-editor__embedded-modal-size">
            <input
              onChange={this.updateValue}
              onBlur={this.updateValue}
              value={height}
              name="height"
              className="boldr-editor__embedded-modal-size-input"
              placeholder="Height"
            />
            <input
              onChange={this.updateValue}
              onBlur={this.updateValue}
              value={width}
              name="width"
              className="boldr-editor__embedded-modal-size-input"
              placeholder="Width"
            />
          </div>
        </div>
        <span className="boldr-editor__embedded-modal-btn-section">
          <button
            className="boldr-editor__embedded-modal-btn"
            onClick={this.onChange}
            disabled={!embeddedLink || !height || !width}
          >
            Add
          </button>
          <button
            className="boldr-editor__embedded-modal-btn"
            onClick={doCollapse}
          >
            Cancel
          </button>
        </span>
      </div>
    );
  }

  render(): Object {
    const {
      config: { icon, className, title },
      expanded,
      onExpandEvent,
    } = this.props;
    return (
      <div
        className="boldr-editor__embedded-wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="boldr-editor__embedded-control"
      >
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
          title={title}
        >
          <Icon kind="embedded" color="#222" />
        </Option>
        {expanded ? this.rendeEmbeddedLinkModal() : undefined}
      </div>
    );
  }
}

export default LayoutComponent;
