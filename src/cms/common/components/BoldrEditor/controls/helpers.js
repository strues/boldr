import React from 'react';
import Blockquote from '../icons/Blockquote';
import Bold from '../icons/Bold';
import Codeblock from '../icons/Codeblock';
import H1 from '../icons/H1';
import H2 from '../icons/H2';
import H3 from '../icons/H3';
import H4 from '../icons/H4';
import H5 from '../icons/H5';
import H6 from '../icons/H6';
import Italic from '../icons/Italic';
import Link from '../icons/Link';
import Monospace from '../icons/Monospace';
import OrderedList from '../icons/OrderedList';
import Underline from '../icons/Underline';
import UnorderedList from '../icons/UnorderedList';

export function validator(controls) {
  return (propValue, key, componentName, location, propFullName) => {
    const errors = propValue.map(value => (controls.indexOf(value) !== -1));
    if (! errors.every(error => !! error)) {
      return new Error(`Invalid prop ${propFullName} supplied to ${componentName}`);
    }
  };
}

export const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one', icon: <H1 /> },
  { label: 'H2', style: 'header-two', icon: <H2 /> },
  { label: 'H3', style: 'header-three', icon: <H3 /> },
  { label: 'H4', style: 'header-four', icon: <H4 /> },
  { label: 'H5', style: 'header-five', icon: <H5 /> },
  { label: 'H6', style: 'header-six', icon: <H6 /> },
  { label: 'UL', style: 'unordered-list-item', icon: <UnorderedList /> },
  { label: 'OL', style: 'ordered-list-item', icon: <OrderedList /> },
  { label: 'Blockquote', style: 'blockquote', icon: <Blockquote /> },
  { label: 'Code Block', style: 'code-block', icon: <Codeblock /> },
];

export const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD', icon: <Bold /> },
  { label: 'Italic', style: 'ITALIC', icon: <Italic /> },
  { label: 'Underline', style: 'UNDERLINE', icon: <Underline /> },
  { label: 'Monospace', style: 'CODE', icon: <Monospace /> },
  { label: 'Link', style: 'LINK', icon: <Link /> },
];

export const BLOCK_CONTROLS = BLOCK_TYPES.map(type => type.label);
export const INLINE_CONTROLS = INLINE_STYLES.map(style => style.label);
