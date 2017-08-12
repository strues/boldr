/* @flow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// $FlowIssue
import { EditorState } from 'draft-js';
import classNames from 'classnames';
import Option from '../../components/Option';

const getImageRender = (config: Object) =>
  class Image extends Component {
    static propTypes: Object = {
      block: PropTypes.object,
      contentState: PropTypes.object,
    };

    state: Object = {
      hovered: false,
    };

    setEntityAlignmentLeft: Function = (): void => {
      this.setEntityAlignment('left');
    };

    setEntityAlignmentRight: Function = (): void => {
      this.setEntityAlignment('right');
    };

    setEntityAlignmentCenter: Function = (): void => {
      this.setEntityAlignment('none');
    };

    setEntityAlignment: Function = (alignment): void => {
      const { block, contentState } = this.props;
      const entityKey = block.getEntityAt(0);
      contentState.mergeEntityData(entityKey, { alignment });
      config.onChange(EditorState.push(config.getEditorState(), contentState, 'change-block-data'));
      this.setState({
        dummy: true,
      });
    };

    toggleHovered: Function = (): void => {
      const hovered = !this.state.hovered;
      this.setState({
        hovered,
      });
    };

    renderAlignmentOptions(alignment: string): Object {
      return (
        <div
          className={classNames('boldredit-image-alignment-options-popup', {
            'boldredit-image-alignment-options-popup-right': alignment === 'right',
          })}
        >
          <Option
            onClick={this.setEntityAlignmentLeft}
            className="boldredit-image-alignment-option"
          >
            L
          </Option>
          <Option
            onClick={this.setEntityAlignmentCenter}
            className="boldredit-image-alignment-option"
          >
            C
          </Option>
          <Option
            onClick={this.setEntityAlignmentRight}
            className="boldredit-image-alignment-option"
          >
            R
          </Option>
        </div>
      );
    }

    render(): Object {
      const { block, contentState } = this.props;
      const { hovered } = this.state;
      const { isReadOnly, isImageAlignmentEnabled } = config;
      const entity = contentState.getEntity(block.getEntityAt(0));
      const { src, alignment, height, width, alt } = entity.getData();

      return (
        <span
          onMouseEnter={this.toggleHovered}
          onMouseLeave={this.toggleHovered}
          className={classNames('boldredit-image-alignment', {
            'boldredit-image-left': alignment === 'left',
            'boldredit-image-right': alignment === 'right',
            'boldredit-image-center': !alignment || alignment === 'none',
          })}
        >
          <span className="boldredit-image-imagewrapper">
            <img
              src={src}
              alt={alt}
              style={{
                height,
                width,
              }}
            />
            {!isReadOnly() && hovered && isImageAlignmentEnabled()
              ? this.renderAlignmentOptions(alignment)
              : undefined}
          </span>
        </span>
      );
    }
  };

export default getImageRender;
