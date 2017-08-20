/* eslint-disable  react/no-array-index-key */
/* @flow */
import * as React from 'react';
import type { ContentBlock, ContentState } from 'draft-js';
import ExternalLink from '@boldr/icons/ExternalLink';
import type { LinkConfig } from '../../config';
import { LinkDecoratorWrap } from './Link.styled';

type Props = {
  children: React.ChildrenArray<React.Node>,
  entityKey: string,
  contentState: ContentState,
};
type State = {
  showPopOver: boolean,
};

type EntityRangeCallback = (start: number, end: number) => void;

function findLinkEntities(
  contentBlock: ContentBlock,
  callback: EntityRangeCallback,
  contentState: ?ContentState,
) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    if (entityKey !== null) {
      const entity = contentState ? contentState.getEntity(entityKey) : null;
      return entity !== null && entity.getType() === 'LINK';
    }
    return false;
  }, callback);
}

function getLinkComponent(config) {
  const { showOpenOptionOnHover } = config;
  return class Link extends React.Component<Props, State> {
    state: State = {
      showPopOver: false,
    };
    props: Props;

    openLink: Function = () => {
      const { entityKey, contentState } = this.props;
      const { url } = contentState.getEntity(entityKey).getData();
      const linkTab = window.open(url, 'blank'); // eslint-disable-line no-undef
      linkTab.focus();
    };

    toggleShowPopOver: Function = () => {
      const showPopOver = !this.state.showPopOver;
      this.setState({
        showPopOver,
      });
    };

    render() {
      const { children, entityKey, contentState } = this.props;
      const { url, targetOption } = contentState.getEntity(entityKey).getData();
      const { showPopOver } = this.state;
      return (
        <LinkDecoratorWrap
          onMouseEnter={this.toggleShowPopOver}
          onMouseLeave={this.toggleShowPopOver}
        >
          <a href={url} target={targetOption}>
            {children}
          </a>
          {showPopOver && showOpenOptionOnHover
            ? <ExternalLink
                onClick={this.openLink}
                color="#222"
                className="be-link-decorator-icon"
              />
            : undefined}
        </LinkDecoratorWrap>
      );
    }
  };
}

export default (config: LinkConfig) => {
  return {
    strategy: findLinkEntities,
    component: getLinkComponent(config),
  };
};
