// @flow
/* eslint-disable react/no-danger */
import React from 'react';
import type { Node } from 'react';

type Props = {
  children: Node,
};

const JsonLd = ({ children }: Props) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(children) }}
  />
);

export default JsonLd;
