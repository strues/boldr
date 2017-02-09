/* flow */
import React from 'react';
import Divider from 'react-md/lib/Dividers';
import Paper from 'react-md/lib/Papers';
import styled from 'styled-components';
import { Col, Heading, Icon } from '../../../../components/index';
import PostImage from '../PostImage';
import PostTitle from '../PostTitle';
import PostDate from '../PostDate';

type Props = {
  title: String,
  content: String,
  feature_image: ?String
}

const ArticleWrapper = styled.article`
  margin-top: 0;
`;
const PostContent = (props: Props) => {
  function createMarkup() {
    return { __html: props.content,
    };
  }
  return (
    <ArticleWrapper>
      <Paper zDepth={ 2 } style={ { padding: '1em', marginBottom: '50px' } } className="boldr-paperoverride">
       
       <PostDate created={ props.created_at } />
        <Divider />
        <div className="boldr-post__content" dangerouslySetInnerHTML={ createMarkup() } />
      </Paper>
    </ArticleWrapper>
  );
};

export default PostContent;
