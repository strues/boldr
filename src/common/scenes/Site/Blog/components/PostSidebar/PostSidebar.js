/* @flow */
import React from 'react';
import { Segment } from 'semantic-ui-react';
import { Heading } from '../../../../../components/index';
import Author from '../Author';
import TagBlock from '../TagBlock';


const PostSidebar = (props: { tags: Array<Object>, author: Object }) => {
  return (
    <div className="sidebar">
      <Segment raised>
        <Heading size={ 2 } color="#1F2439">Author</Heading>
        <Author { ...props.author } />
      </Segment>
      <Segment raised>
        <Heading size={ 2 } color="#1F2439">Tags</Heading>
        <TagBlock tags={ props.tags } />
      </Segment>
    </div>
  );
};

export default PostSidebar;
