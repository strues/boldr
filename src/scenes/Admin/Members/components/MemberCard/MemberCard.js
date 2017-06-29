/* @flow */
import React from 'react';
import styled from 'styled-components';
import Button from '@boldr/ui/Button';
import Avatar from '@boldr/ui/Avatar';

const MemListItem = styled.li`
  width: 100%;
  display: flex;
  margin-top: 10px;
  padding: 20px;
  align-items: center;
  border-radius: 2px;
  background: #fff;
  box-shadow: 0 2px 1px rgba(170, 170, 170, 0.25);
`;

const RightSide = styled.div`
  position: relative;
  align-items: flex-end;
`;
const UserInfoList = styled.ul`
  display: inline-flex;
  align-items: center;
  list-style-type: none;
  justify-content: space-between;
`;
const UserInfoListItem = styled.li`
  padding-left: 1em;
  padding-right: 1em;
`;
const LeftSide = styled.div`
  align-items: flex-start;
  width: 90%;
`;

type Props = {
  user: Object,
  handleToggle: () => void,
  username: string,
  lastName: string,
  firstName: string,
  roleName: string,
  id: string,
  email: string,
  avatarUrl: string,
};

const MemberCard = (props: Props) => {
  const { user, handleToggle, username, roleName, avatarUrl, lastName, firstName, email } = props;
  return (
    <MemListItem>
      <LeftSide>
        <UserInfoList>
          <UserInfoListItem>
            <Avatar src={avatarUrl} role="presentation" />
          </UserInfoListItem>
          <UserInfoListItem>
            {username}
          </UserInfoListItem>
          <UserInfoListItem>
            {roleName}
          </UserInfoListItem>
          <UserInfoListItem>
            {firstName} {lastName}
          </UserInfoListItem>
          <UserInfoListItem>
            {email}
          </UserInfoListItem>
        </UserInfoList>
      </LeftSide>
      <RightSide>
        <Button onClick={() => handleToggle(user)} kind="primary">
          Edit
        </Button>
      </RightSide>
    </MemListItem>
  );
};

export default MemberCard;
