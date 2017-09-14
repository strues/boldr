/* eslint-disable react/no-unused-prop-types */
// @flow

import React from 'react';

type InnerHTML = {
  __html: string,
};
type Props = {
  className?: string,
  dangerouslySetInnerHTML: InnerHTML,
};

const DynamicContent = (props: Props) => {
  return (
    <div className={props.className} dangerouslySetInnerHTML={props.dangerouslySetInnerHTML} />
  );
};

export default DynamicContent;
