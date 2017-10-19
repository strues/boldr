/* @flow */

import React from 'react';
import type { Node } from 'react';
import cn from 'classnames';
import { Video } from '../../Icons';
import { stopPropagation } from '../../../utils/common';
import Option from '../../Option';

export type Props = {
  expanded: boolean,
  onExpandEvent: Function,
  doCollapse: Function,
  onChange: Function,
  config: Object,
};
type State = {
  embeddedLink: string,
  height: number,
  width: number,
};

class EmbeddedLayout extends React.Component<Props, State> {
  state: State = {
    embeddedLink: '',
    height: this.props.config.defaultSize.height,
    width: this.props.config.defaultSize.width,
  };

  componentWillReceiveProps(props: Props) {
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

  updateValue: Function = (event: SyntheticEvent<>): void => {
    this.setState({
      [`${event.target.name}`]: event.target.value,
    });
  };

  onChange: Function = (): void => {
    const { onChange } = this.props;
    const { embeddedLink, height, width } = this.state;
    onChange(embeddedLink, height, width);
  };

  rendeEmbeddedLinkModal(): Node {
    const { embeddedLink, height, width } = this.state;
    const { config: { modalClassName }, doCollapse } = this.props;
    return (
      <div className={cn('be-modal', modalClassName)} onClick={stopPropagation}>
        <div className={cn('be-modal__top')}>
          <span className={cn('be-modal__opt')}>
            Embedded Link
            <span className={cn('be-modal__label')} />
          </span>
        </div>
        <div className={cn('be-embedded__modal-link-section')}>
          <input
            className={cn('be-modal__input')}
            placeholder="Enter link"
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={embeddedLink}
            name="embeddedLink"
          />
          <div className={cn('be-modal__sizes')}>
            <input
              className={cn('be-modal__input be-modal__input--sm')}
              onChange={this.updateValue}
              onBlur={this.updateValue}
              value={height}
              name="height"
              placeholder="Height"
            />
            <input
              className={cn('be-modal__input be-modal__input--sm')}
              onChange={this.updateValue}
              onBlur={this.updateValue}
              value={width}
              name="width"
              placeholder="Width"
            />
          </div>
        </div>
        <div className={cn('be-modal__btns')}>
          <button
            className={cn('be-modal__btn')}
            onClick={this.onChange}
            disabled={!embeddedLink || !height || !width}>
            Add
          </button>
          <button className={cn('be-modal__btn')} onClick={doCollapse}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  render(): Node {
    const { config: { className, title }, expanded, onExpandEvent } = this.props;
    return (
      <div
        className={cn('be-ctrl__group')}
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="be-embedded__control">
        <Option
          className={cn(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
          title={title}>
          <Video size={20} fill="#222" />
        </Option>
        {expanded ? this.rendeEmbeddedLinkModal() : undefined}
      </div>
    );
  }
}

export default EmbeddedLayout;
