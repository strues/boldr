/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from 'state/dux/post';
import { PrimaryHeader, Footer } from 'components/index';
import PageTemplate from 'theme/Boldr/PageTemplate';
import type { ReactChildren } from '../../types/react';

const BlogContainer = (props: { children: ReactChildren }) => {
  return (
    <div>
      <PageTemplate header={ <PrimaryHeader /> } footer={ <Footer /> }>
        { props.children }
      </PageTemplate>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    loading: state.posts.isLoading
  };
};

export default connect(mapStateToProps)(BlogContainer);
