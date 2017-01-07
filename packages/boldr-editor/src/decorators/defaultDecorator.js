/* @flow */
import React from 'react';
import { Entity, CompositeDecorator } from 'draft-js';
import { ENTITY_TYPE } from 'draft-js-utils';
import type { ContentBlock } from 'draft-js';
import type { ReactNode } from '../types/react';

type Props = {
  children: ReactNode,
  entityKey: string,
};

type EntityRangeCallback = (start: number, end: number) => void;

function findLinkEntities(contentBlock: ContentBlock, callback: EntityRangeCallback) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey != null && Entity.get(entityKey).getType() === ENTITY_TYPE.LINK
    );
  }, callback);
}


function Link(props: Props) {
  const { url } = Entity.get(props.entityKey).getData();
  return (
    <a href={ url }>{ props.children }</a>
  );
}

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

export default decorator;
