/* @flow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import classNames from 'classnames';
import Option from '../../components/Option';

const getImageRender = config =>
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

    renderAlignmentOptions(alignment): Object {
      return (
        <div
          className={classNames('boldrui-editor__image-alignment-options-popup', {
            'boldrui-editor__image-alignment-options-popup-right': alignment === 'right',
          })}
        >
          <Option
            onClick={this.setEntityAlignmentLeft}
            className="boldrui-editor__image-alignment-option"
          >
            L
          </Option>
          <Option
            onClick={this.setEntityAlignmentCenter}
            className="boldrui-editor__image-alignment-option"
          >
            C
          </Option>
          <Option
            onClick={this.setEntityAlignmentRight}
            className="boldrui-editor__image-alignment-option"
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
      const { src, alignment, height, width } = entity.getData();

      return (
        <span
          onMouseEnter={this.toggleHovered}
          onMouseLeave={this.toggleHovered}
          className={classNames('boldrui-editor__image-alignment', {
            'boldrui-editor__image-left': alignment === 'left',
            'boldrui-editor__image-right': alignment === 'right',
            'boldrui-editor__image-center': !alignment || alignment === 'none',
          })}
        >
          <span className="boldrui-editor__image-imagewrapper">
            <img
              src={src}
              alt=""
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
