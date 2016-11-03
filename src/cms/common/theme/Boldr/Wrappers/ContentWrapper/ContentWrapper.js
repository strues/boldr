/* @flow */
import React from 'react';
import boldrStyle from '../../boldrStyle';

const ContentWrapper = (props: { children: ReactChildren }) => {
  return (
    <article style={ boldrStyle.content } className="boldr__theme-content">
      { props.children }
    </article>
  );
};

export default ContentWrapper;
