/* @flow */
import React from 'react';
import Paper from 'react-md/lib/Papers';
import { Heading, Col } from '../../../../components/index';
import type { User, Tag } from '../../../../types/models';
import Author from '../Author';
import TagBlock from '../TagBlock';

type Props = {
  tags: Array<Tag>,
  author: User,
};
const PostSidebar = (props: Props) => {
  return (
    <div>
      <Paper zDepth={ 1 } style={ { padding: '1em' } }>
        <Heading size={ 2 } color="#1F2439">Author</Heading>
        <Author { ...props.author } />
      </Paper>
      <Paper zDepth={ 1 } style={ { padding: '1em', marginTop: '25px' } }>
        <Heading size={ 2 } color="#1F2439">Tags</Heading>
        <TagBlock tags={ props.tags } />
      </Paper>
    </div>
  );
};

export default PostSidebar;
