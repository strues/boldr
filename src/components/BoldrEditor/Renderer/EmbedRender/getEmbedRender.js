/* @flow */
import React from 'react';

export type Props = {
  block?: Object,
  contentState?: Object,
};

const getEmbedRender = ({ block, contentState }: Props) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src, height, width } = entity.getData();
  return (
    <iframe
      height={height}
      width={width}
      src={src}
      frameBorder="0"
      allowFullScreen
      title="Wysiwyg Embedded Content"
    />
  );
};

export default getEmbedRender;
