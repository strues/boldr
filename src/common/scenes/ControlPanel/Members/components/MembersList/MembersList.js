/* @flow */
import React from 'react';
import { Card } from 'semantic-ui-react';

import MemberCard from '../MemberCard';

const MembersList = (props: { users: Array<Object>, toggleUser: Function }) => {
  function handleToggle(userId: String) {
    props.toggleUser(userId);
  }
  return (
      <Card.Group>
        {
          props.users.map((user) =>
          <MemberCard
            user={ user }
            key={ user.id }
            handleToggle={ handleToggle }
          />,
          )
        }
      </Card.Group>

  );
};

export default MembersList;
