/* @flow */
import React from 'react';
import { Entity, CompositeDecorator } from 'draft-js';
import type { ContentBlock } from 'draft-js';
import type { ReactChildren } from '../types/react';

type Props = {
  children: ReactChildren,
  entityKey: string,
};

type EntityRangeCallback = (start: number, end: number) => void;

const findLinkEntities = (contentBlock: ContentBlock, callback: EntityRangeCallback): void => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'LINK'
      );
    },
    callback,
  );
};

const Link = (props: Props) => {
  const { target, url } = Entity.get(props.entityKey).getData();
  return (
    <a href={ url } target={ target } className="be-link">
      { props.children }
    </a>
  );
};

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

export default decorator;
