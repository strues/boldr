/* flow */
import React from 'react';
import { Divider, Header } from 'semantic-ui-react';
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
    <article>
      { props.feature_image ?
        <PostImage imageSrc={ props.feature_image } /> :
        null
      }
      <div style={ { padding: '2em 1.5em' } }>
       <Header size="large">{ props.title } </Header>

        <Divider />
        <div className="content" style={ { lineHeight: '1.8em' } } dangerouslySetInnerHTML={ createMarkup() } />
      </div>
    </article>
  );
};

export default PostContent;
