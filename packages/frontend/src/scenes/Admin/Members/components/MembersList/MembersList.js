/* @flow */
import React from 'react';
import styled from 'styled-components';
// internal
import MemberCard from '../MemberCard';

const MemList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const MembersList = (props: { users: Array<Object>, toggleUser: Function }) => {
  function handleToggle(user) {
    // const userId = user.id;
    props.toggleUser(user);
  }
  return (
    <div className="boldrui-members-list">
      <MemList>
        {props.users.map(user =>
          <MemberCard
            id={user.id}
            avatarUrl={user.avatarUrl}
            email={user.email}
            roleName={user.roles[0].name}
            key={user.id}
            firstName={user.firstName}
            lastName={user.lastName}
            username={user.username}
            handleToggle={handleToggle}
            user={user}
          />,
        )}
      </MemList>
    </div>
  );
};

export default MembersList;
