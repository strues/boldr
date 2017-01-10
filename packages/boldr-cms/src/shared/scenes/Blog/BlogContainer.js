/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import { Footer } from '../../components/index';
import BaseTemplate from '../../pages/templates/Base';
import type { ReactChildren } from '../../types/react';

const BlogContainer = (props: { children: ReactChildren }) => {
  return (
    <div>
      <BaseTemplate
        helmetMeta={ <Helmet title="Blog" /> }
        footer={ <Footer /> }
      >
        { props.children }
      </BaseTemplate>
    </div>
  );
};

export default BlogContainer;
