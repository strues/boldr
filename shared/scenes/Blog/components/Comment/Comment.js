/* @flow */
import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import styled from 'styled-components';
import Button from 'react-md/lib/Buttons';
import FontIcon from 'react-md/lib/FontIcons';

const Wrapper = styled.section`
  display: block;
  width: 100%;
  margin-bottom: 10px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .4);
  background-color: #fff;
`;
const CommentHeader = styled.section`
  display: flex;
  width: 100%;
  background-color: #262B33;
  margin-bottom: 10px;
  padding: 1em;
  color: #fff;
`;

type Props = {

}
const Comment = (props: Props) => {

  return (
    <div>
      <Wrapper>
        <CommentHeader>
          <Avatar src={ props.commenter.avatar_url } role="presentation" />{ props.commenter.username }
      </CommentHeader>


      { props.comment.content }
    </Wrapper>
    </div>
  );
};

export default Comment;
