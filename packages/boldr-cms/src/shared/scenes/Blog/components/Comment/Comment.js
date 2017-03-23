/* @flow */
import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import styled from 'styled-components';
import Button from 'react-md/lib/Buttons';
import FontIcon from 'react-md/lib/FontIcons';
import format from 'date-fns/format';

import { Heading } from '../../../../components';

const Wrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 10px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .4);
  background-color: #fff;
`;

const CommentSide = styled.div`
  margin-bottom: 10px;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  padding: 1em;
  width: 100%;
`;

const CommentMeta = styled.div`
  display: flex;
  margin-top: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const ReplyButton = styled.div`
  position: absolute;
  right: 10;
  top: 5;
`;
const CommentBody = styled.div`
  padding-top: 35px;
  width: 100%;
  display: block;
`;
const CommentDate = styled.div`
  margin-right: 15px;
`;
const CommentModButtons = styled.div`
  align-items: flex-end;
`;
type Props = {
  commenter: Object,
  comment: Object,
  canModerate: Boolean,
  isAuthenticated: Boolean,
};
const Comment = (props: Props) => {
  function createMarkup() {
    return {
      __html: props.comment.content,
    };
  }
  return (
    <div className="boldr-comment">
      <Wrapper>
        <CommentSide>
          <Avatar src={ props.commenter.avatarUrl } role="presentation" />
          <Heading size={ 4 } style={ { marginTop: '0px' } }>{props.commenter.username}</Heading>
        </CommentSide>
        <Content>
          {!props.isAuthenticated
            ? null
            : <ReplyButton>
              <Button flat secondary label="reply" />
            </ReplyButton>}
          <CommentBody>
            <div className="boldr-comment__content" dangerouslySetInnerHTML={ createMarkup() } />
          </CommentBody>
          <CommentMeta>
            <CommentDate>
              {format(props.comment.created_at, 'HH:mma MMM Do YYYY')}
            </CommentDate>
            {!props.canModerate
              ? null
              : <CommentModButtons>
                <Button icon>edit</Button>
                <Button icon>delete</Button>
              </CommentModButtons>}
          </CommentMeta>
        </Content>
      </Wrapper>
    </div>
  );
};

export default Comment;
