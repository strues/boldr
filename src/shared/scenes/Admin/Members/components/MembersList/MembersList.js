/* @flow */
import React from 'react';

import MemberCard from '../MemberCard';

const MembersList = (props: {users: Array<Object>, toggleUser: Function}) => {
  function handleToggle(user) {
    const userId = user.id;
    props.toggleUser(userId);
  }
  return (
    <div>
      {props.users.map(user => <MemberCard user={ user } key={ user.id } handleToggle={ handleToggle } />)}
    </div>
  );
};

export default MembersList;
