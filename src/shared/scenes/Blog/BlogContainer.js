/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import BaseTemplate from '../../pages/templates/Base';
import type { ReactChildren } from '../../types/react';

const BlogContainer = (props: {children: ReactChildren}) => {
  return (
    <BaseTemplate helmetMeta={ <Helmet title="Blog" /> }>
      {props.children}
    </BaseTemplate>
  );
};

export default BlogContainer;
