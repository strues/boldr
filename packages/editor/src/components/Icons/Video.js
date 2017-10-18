import React from 'react';
import Icon from './Icon';

const Video = props => (
  <Icon viewBox="0 0 576 512" {...props}>
    <path d="M528 64h-12.118a48 48 0 0 0-33.941 14.059L384 176v-64c0-26.51-21.49-48-48-48H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h288c26.51 0 48-21.49 48-48v-64l97.941 97.941A48 48 0 0 0 515.882 448H528c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zM336 400H48V112h288v288zm192 0h-12.118L384 268.118v-24.235L515.882 112H528v288z" />
  </Icon>
);

Video.defaultProps = { name: 'Video' };

export default Video;
