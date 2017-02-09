/* @flow */
import React from 'react';
import styled from 'styled-components';
import Paper from 'react-md/lib/Papers';
import { Heading, Col } from '../../../../components/index';
import type { User, Tag } from '../../../../types/models';
import Author from '../Author';
import TagBlock from '../TagBlock';

type Props = {
  tags: Array<Tag>,
  author: User,
};
const Sidebar = styled.aside`
  height: 100%;
  padding-left: 50px;
`;
const PostSidebar = (props: Props) => {
  return (
    <div>
      <Sidebar>

          <Heading size={ 2 } color="#1F2439">Author Details</Heading>
          <Author { ...props.author } />

        <Paper zDepth={ 1 } style={ { padding: '1em', marginTop: '25px' } } className="boldr-paperoverride">
          <Heading size={ 2 } color="#1F2439">Tags</Heading>
          <TagBlock tags={ props.tags } />
        </Paper>
      </Sidebar>
    </div>
  );
};

export default PostSidebar;
