import React from 'react';
import Icon from './Icon';

const Italic = props => (
  <Icon viewBox="0 0 256 512" {...props}>
    <path d="M89.42 80h40.484L62.006 432H16.763a12 12 0 0 0-11.771 9.666l-4.759 24C-1.238 473.086 4.439 480 12.004 480H161.82a12 12 0 0 0 11.771-9.666l4.759-24c1.471-7.42-4.206-14.334-11.771-14.334h-41.118L193.36 80h45.877a12 12 0 0 0 11.771-9.666l4.759-24C257.238 38.914 251.56 32 243.996 32H94.179a12 12 0 0 0-11.771 9.666l-4.759 24C76.178 73.086 81.856 80 89.42 80z" />
  </Icon>
);

Italic.defaultProps = { name: 'Italic' };

export default Italic;
