/* flow */
import React from 'react';
import Divider from 'react-md/lib/Dividers';
import Paper from 'react-md/lib/Papers';
import { Col, Heading, Icon } from '../../../../components/index';
import PostImage from '../PostImage';
import PostTitle from '../PostTitle';
import PostDate from '../PostDate';

type Props = {
  title: String,
  content: String,
  feature_image: ?String,
  created_at: Date,
}

const PostContent = (props: Props) => {
  function createMarkup() {
    return { __html: props.content,
    };
  }
  return (
    <article>
      <Paper zDepth={ 2 } style={ { padding: '1em', marginBottom: '50px' } } className="boldr-paperoverride">

       <PostDate created={ props.created_at } />
        <Divider />
        <div className="boldr-post__content" dangerouslySetInnerHTML={ createMarkup() } />
      </Paper>
    </article>
  );
};

export default PostContent;
