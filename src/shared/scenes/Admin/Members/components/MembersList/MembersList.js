/* @flow */
import React from 'react';

import MemberCard from '../MemberCard';

const MembersList = (props: { users: Array<Object>, toggleUser: Function }) => {
  function handleToggle(user) {
    const userId = user.id;
    props.toggleUser(userId);
  }
  return (
    <div className="boldrui-members-list">
      {props.users.map(user => (
        <MemberCard
          id={user.id}
          avatarUrl={user.avatarUrl}
          email={user.email}
          roleName={user.roles[0].name}
          key={user.id}
          handleToggle={handleToggle}
          user={user}
        />
      ))}
    </div>
  );
};

export default MembersList;
