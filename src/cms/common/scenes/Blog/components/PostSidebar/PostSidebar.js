/* @flow */
import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

import Author from '../Author';
import TagBlock from '../TagBlock';


const PostSidebar = (props: { tags: Array<Object>, author: Object }) => {
  return (
    <div className="sidebar">
      <Segment raised>
        <Header as="h2">About the author</Header>
        <Author { ...props.author } />
      </Segment>
      <Segment raised>
        <Header as="h2">Tags</Header>
        <TagBlock tags={ props.tags } />
      </Segment>
    </div>
  );
};

export default PostSidebar;
