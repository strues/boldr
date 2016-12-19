/* flow */
import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { Col, Heading } from 'components/index';
import PostImage from '../PostImage';

type Props = {
  title: String,
  content: String,
  feature_image: ?String
}
const PostContent = (props: Props) => {
  function createMarkup() {
    return { __html: props.content,
    };
  }
  return (
    <Col xs={ 12 } md={ 8 } lg={ 9 }>
      <Paper zDepth={ 1 }>
    <article>
      { props.feature_image ?
        <PostImage imageSrc={ props.feature_image } /> :
        null
      }
      <div style={ { padding: '2em 1.5em' } }>
       <Heading size={ 1 }>{ props.title }</Heading>

        <Divider />
        <div className="content" style={ { lineHeight: '1.8em' } } dangerouslySetInnerHTML={ createMarkup() } />
      </div>
    </article>
  </Paper>
  </Col>
  );
};

export default PostContent;
