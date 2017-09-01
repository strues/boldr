/* eslint-disable return-assign, consistent-return, no-param-reassign, prefer-template */
// @flow
import React from 'react';
import { Entity } from 'draft-js';

import { blocks } from './maps';

export const rgbToHex = rgb => {
  if (rgb.indexOf('#') === 0) {
    return rgb;
  }

  let rgbArray = rgb.split(',');

  return (
    '#' +
    [rgbArray[0], rgbArray[1], rgbArray[2]]
      .map(x => {
        const hex = parseInt(x.replace(/\D/g, ''), 10).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
};

const convertAtomicBlock = (block, contentState) => {
  const contentBlock = contentState.getBlockForKey(block.key);
  const entityKey = contentBlock.getEntityAt(0);
  const entity = contentState.getEntity(entityKey);
  const mediaType = entity.getType().toLowerCase();

  const { float, alignment } = block.data;
  const { url, link, linkTarget, width, height } = entity.getData();

  if (mediaType === 'image') {
    const imageWrapStyle = {};

    if (float) {
      imageWrapStyle.float = float;
    } else if (alignment) {
      imageWrapStyle.textAlign = alignment;
    }

    if (link) {
      return (
        <div className="media-wrap image-wrap" style={imageWrapStyle}>
          <a style={{ display: 'inline-block' }} href={link} target={linkTarget}>
            <img src={url} width={width} height={height} />
          </a>
        </div>
      );
    } else {
      return (
        <div data-key={block.key} data-role="image-wrap" style={imageWrapStyle}>
          <img src={url} width={width} height={height} />
        </div>
      );
    }
  } else if (mediaType === 'audio') {
    return (
      <div className="media-wrap audio-wrap">
        <audio controls src={url} />
      </div>
    );
  } else if (mediaType === 'video') {
    return (
      <div className="media-wrap video-wrap">
        <video controls src={url} width={width} height={height} />
      </div>
    );
  } else {
    return <p />;
  }
};
// $FlowIssue
const styleToHTML = ({ fontFamilies }) => style => {
  style = style.toLowerCase();

  if (style === 'strikethrough') {
    return <span style={{ textDecoration: 'line-through' }} />;
  } else if (style === 'superscript') {
    return <sup />;
  } else if (style === 'subscript') {
    return <sub />;
  } else if (style.indexOf('color-') === 0) {
    return <span style={{ color: `#${style.split('-')[1]}` }} />;
  } else if (style.indexOf('bgcolor-') === 0) {
    return <span style={{ backgroundColor: `#${style.split('-')[1]}` }} />;
  } else if (style.indexOf('fontsize-') === 0) {
    return <span style={{ fontSize: `${style.split('-')[1]}px` }} />;
  } else if (style.indexOf('fontfamily-') === 0) {
    // @note: was item => item.name.toLowerCase()
    const fontFamily = fontFamilies.find(item => item.toLowerCase() === style.split('-')[1]);
    return <span style={{ fontFamily: fontFamily.family }} />;
  }
};

const blockToHTML = contentState => (block: Object) => {
  let blockStyle = '';

  const blockType = block.type.toLowerCase();
  const { textAlign } = block.data;

  if (textAlign) {
    blockStyle = ` style="text-align:${textAlign};"`;
  }

  if (blockType === 'atomic') {
    return convertAtomicBlock(block, contentState);
  } else if (blockType === 'code-block') {
    return {
      start: `<pre><code${blockStyle}>`,
      end: '</code></pre>',
    };
  } else if (blocks[blockType]) {
    return {
      start: `<${blocks[blockType]}${blockStyle}>`,
      end: `</${blocks[blockType]}>`,
    };
  }
};
// $FlowIssue
const entityToHTML = (entity, originalText) => {
  const entityType = entity.type.toLowerCase();

  if (entityType === 'link') {
    return (
      <a href={entity.data.href} target={entity.data.target}>
        {originalText}
      </a>
    );
  }
};
// $FlowIssue
export const getToHTMLConfig = props => {
  return {
    styleToHTML: styleToHTML(props),
    entityToHTML: entityToHTML,
    blockToHTML: blockToHTML(props.contentState),
  };
};

const htmlToStyle = (nodeName: string, node: Object, currentStyle: any) => {
  if (nodeName === 'span' && node.style.color) {
    const color = rgbToHex(node.style.color).replace('#', '');
    return currentStyle.add(`COLOR-${color}`);
  } else if (nodeName === 'span' && node.style.backgroundColor) {
    const color = rgbToHex(node.style.color).replace('#', '');
    return currentStyle.add(`BGCOLOR-${color}`);
  } else if (nodeName === 'sup') {
    return currentStyle.add('SUPERSCRIPT');
  } else if (nodeName === 'sub') {
    return currentStyle.add('SUBSCRIPT');
  } else if (nodeName === 'span' && node.style.fontSize) {
    return currentStyle.add(`FONTSIZE-${parseInt(node.style.fontSize, 10)}`);
  } else if (nodeName === 'span' && node.style.textDecoration === 'line-through') {
    return currentStyle.add('STRIKETHROUGH');
  } else {
    return currentStyle;
  }
};

const htmlToEntity = (nodeName: string, node: Object) => {
  if (nodeName === 'a' && !node.querySelectorAll('img').length) {
    const { href, target } = node;
    return Entity.create('LINK', 'MUTABLE', { href, target });
  } else if (nodeName === 'audio') {
    return Entity.create('AUDIO', 'IMMUTABLE', { url: node.src });
  } else if (nodeName === 'video') {
    return Entity.create('VIDEO', 'IMMUTABLE', { url: node.src });
  } else if (nodeName === 'img') {
    const parentNode = node.parentNode;
    let { src: url, width, height } = node;
    width = width || 'auto';
    height = height || 'auto';
    const entityData = { url, width, height };

    if (parentNode.nodeName.toLowerCase() === 'a') {
      // $FlowIssue
      entityData.link = parentNode.href;
      // $FlowIssue
      entityData.linkTarget = parentNode.target;
    }

    return Entity.create('IMAGE', 'IMMUTABLE', entityData);
  }
};

const htmlToBlock = (nodeName: string, node: Object) => {
  const nodeStyle = node.style || {};

  if (node.classList.contains('media-wrap')) {
    return {
      type: 'atomic',
      data: {
        float: nodeStyle.float,
        alignment: nodeStyle.textAlign,
      },
    };
  } else if (nodeName === 'p' && nodeStyle.textAlign) {
    return {
      type: 'unstyled',
      data: {
        textAlign: nodeStyle.textAlign,
      },
    };
  }
};

export const getFromHTMLConfig = () => {
  return { htmlToStyle, htmlToEntity, htmlToBlock };
};
