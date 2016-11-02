export type Props = {
  entityKey?: any,
  children?: any,
};

import React from 'react';
import { Entity } from 'draft-js';

const linkStrategy = (contentBlock, callback) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
};

const Link = (props) => {
  const { target, url } = Entity.get(props.entityKey).getData();
  return (
    <a href={ url } target={ target }>
      {props.children}
    </a>
  );
};

export default {
  strategy: linkStrategy,
  component: Link,
};
