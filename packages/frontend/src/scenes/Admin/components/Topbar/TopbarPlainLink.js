/* @flow */
import React from 'react';

type Props = {
  index: string | number,
  url: string,
  children: ReactChildren,
};

/**
 * Standard stateless link component
 *
 * @param {object} props - Link options containing at least a `url`
 * @return {object} - Markup for the link
 */
export default ({ index, url, ...props }: Props) =>
  <a {...props} href={index || url}>
    {props.children}
  </a>;
