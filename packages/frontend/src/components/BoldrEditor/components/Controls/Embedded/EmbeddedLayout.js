/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import Video from '@boldr/icons/Video';
import { stopPropagation } from '../../../utils/common';
import Option from '../../Option';
import { ControlWrapper } from '../Controls.styled';
import {
  EmbeddedModal,
  EmbeddedHeaderOpt,
  EmbeddedHeader,
  EmbeddedHeaderLabel,
  EmbeddedLinkSection,
  EmbeddedSize,
  EmbeddedInput,
  EmbeddedSizeInput,
  EmbeddedBtn,
  EmbeddedBtnSection,
} from './Embedded.styled';

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
    const { config: { modalClassName }, doCollapse } = this.props;
    return (
      <EmbeddedModal className={modalClassName} onClick={stopPropagation}>
        <EmbeddedHeader>
          <EmbeddedHeaderOpt>
            Embedded Link
            <EmbeddedHeaderLabel />
          </EmbeddedHeaderOpt>
        </EmbeddedHeader>
        <EmbeddedLinkSection>
          <EmbeddedInput
            placeholder="Enter link"
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={embeddedLink}
            name="embeddedLink"
          />
          <EmbeddedSize>
            <EmbeddedSizeInput
              onChange={this.updateValue}
              onBlur={this.updateValue}
              value={height}
              name="height"
              placeholder="Height"
            />
            <EmbeddedSizeInput
              onChange={this.updateValue}
              onBlur={this.updateValue}
              value={width}
              name="width"
              placeholder="Width"
            />
          </EmbeddedSize>
        </EmbeddedLinkSection>
        <EmbeddedBtnSection>
          <EmbeddedBtn onClick={this.onChange} disabled={!embeddedLink || !height || !width}>
            Add
          </EmbeddedBtn>
          <EmbeddedBtn onClick={doCollapse}>Cancel</EmbeddedBtn>
        </EmbeddedBtnSection>
      </EmbeddedModal>
    );
  }

  render(): Object {
    const { config: { className, title }, expanded, onExpandEvent } = this.props;
    return (
      <ControlWrapper
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="be-embedded__control">
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
          title={title}>
          <Video color="#222" />
        </Option>
        {expanded ? this.rendeEmbeddedLinkModal() : undefined}
      </ControlWrapper>
    );
  }
}

export default EmbeddedLayout;
