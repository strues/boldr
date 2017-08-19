/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import Video from '@boldr/icons/Video';
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

  rendeEmbeddedLinkModal(): Object {
    const { embeddedLink, height, width } = this.state;
    const { config: { popupClassName }, doCollapse } = this.props;
    return (
      <div
        className={classNames('boldr-editor-embedded__modal', popupClassName)}
        onClick={stopPropagation}
      >
        <div className="boldr-editor-embedded__modal-header">
          <span className="boldr-editor-embedded__modal-header-option">
            Embedded Link
            <span className="boldr-editor-embedded__modal-header-label" />
          </span>
        </div>
        <div className="boldr-editor-embedded__modal-link-section">
          <input
            className="boldr-editor-embedded__modal-link-input"
            placeholder="Enter link"
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={embeddedLink}
            name="embeddedLink"
          />
          <div className="boldr-editor-embedded__modal-size">
            <input
              onChange={this.updateValue}
              onBlur={this.updateValue}
              value={height}
              name="height"
              className="boldr-editor-embedded__modal-size-input"
              placeholder="Height"
            />
            <input
              onChange={this.updateValue}
              onBlur={this.updateValue}
              value={width}
              name="width"
              className="boldr-editor-embedded__modal-size-input"
              placeholder="Width"
            />
          </div>
        </div>
        <span className="boldr-editor-embedded__modal-btn-section">
          <button
            className="boldr-editor-embedded__modal-btn"
            onClick={this.onChange}
            disabled={!embeddedLink || !height || !width}
          >
            Add
          </button>
          <button className="boldr-editor-embedded__modal-btn" onClick={doCollapse}>
            Cancel
          </button>
        </span>
      </div>
    );
  }

  render(): Object {
    const { config: { className, title }, expanded, onExpandEvent } = this.props;
    return (
      <div
        className="boldr-editor-embedded__wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="boldr-editor-embedded__control"
      >
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
          title={title}
        >
          <Video color="#222" />
        </Option>
        {expanded ? this.rendeEmbeddedLinkModal() : undefined}
      </div>
    );
  }
}

export default EmbeddedLayout;
