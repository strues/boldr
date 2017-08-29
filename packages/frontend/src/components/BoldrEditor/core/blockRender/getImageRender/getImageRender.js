/* @flow */
import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import classNames from 'classnames';
import Option from '../../../components/Option';

type Props = {
  block: Object,
  contentState: Object,
};
type State = {
  hovered: boolean,
};

const getImageRender = (config: Object) =>
  class Image extends Component<Props, State> {
    state: State = {
      hovered: false,
    };

    props: Props;

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
          className={classNames('be-image__alignment-options-popup', {
            'be-image__alignment-options-popup-right': alignment === 'right',
          })}>
          <Option onClick={this.setEntityAlignmentLeft} className="be-image__alignment-option">
            L
          </Option>
          <Option onClick={this.setEntityAlignmentCenter} className="be-image__alignment-option">
            C
          </Option>
          <Option onClick={this.setEntityAlignmentRight} className="be-image__alignment-option">
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
          className={classNames('be-image__alignment', {
            'be-image--left': alignment === 'left',
            'be-image--right': alignment === 'right',
            'be-image--center': !alignment || alignment === 'none',
          })}>
          <span className="be-image__imagewrapper">
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
