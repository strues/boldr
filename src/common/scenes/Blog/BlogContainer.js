/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import { Footer } from 'components/index';
import PageTemplate from 'theme/Boldr/PageTemplate';
import type { ReactChildren } from '../../types/react';

const BlogContainer = (props: { children: ReactChildren }) => {
  return (
    <div>
      <PageTemplate
        helmetMeta={ <Helmet title="Blog" /> }
        footer={
          <Footer />
        }
      >
        { props.children }
      </PageTemplate>
    </div>
  );
};

export default BlogContainer;
