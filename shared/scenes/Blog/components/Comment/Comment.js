/* @flow */
import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import styled from 'styled-components';
import Button from 'react-md/lib/Buttons';
import FontIcon from 'react-md/lib/FontIcons';
import { Heading } from '../../../../components';

const Wrapper = styled.section`
  position: relative;
  display: table;
  width: 100%;
  margin-bottom: 10px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .4);
  background-color: #fff;
`;

const CommentSide = styled.div`
  display: table-cell;
  width: 5%;
  margin-bottom: 10px;
  padding: 1em;
`;

const Content = styled.div`
  padding: 1.5rem;
  vertical-align: middle;
  display: table-cell;
  padding: 1em;
`;

const CommentMeta = styled.div`
  display: table-row;
  padding-top: 15px;
`;

const CommentActions = styled.div`
  position: absolute;
  right: 10;
  top: 5;
`;
type Props = {
  commenter: Object,
  comment: Object,
};
const Comment = (props: Props) => {
  return (
    <div className="boldr-comment">
      <Wrapper>
        <CommentSide>
          <Avatar src={ props.commenter.avatar_url } role="presentation" />
          <Heading size={ 4 }>{ props.commenter.username }</Heading>
        </CommentSide>
        <Content>
          <CommentActions>
            <Button flat secondary label="reply" />
            <Button icon>edit</Button>
            <Button icon>delete</Button>
          </CommentActions>

          { props.comment.content }
        <CommentMeta>
          { props.comment.created_at }
        </CommentMeta>
        </Content>
      </Wrapper>
    </div>
  );
};

export default Comment;
