/* @flow */
import React from 'react';

const ContentWrapper = (props: { children: ReactChildren }) => {
  return (
    <article className="boldr__theme-content">
      { props.children }
    </article>
  );
};

export default ContentWrapper;
