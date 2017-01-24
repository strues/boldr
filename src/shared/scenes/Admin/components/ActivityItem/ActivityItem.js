import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';
import { format } from 'date-fns';

const ActivityItem = (props) => {
  if (props.activity_post) {
    const created = props.actionType.type === 'create';
    return (
      <div>
        <Avatar src={ props.owner.avatar_url } role="presentation"/> { props.post.title } {format(props.created_at, 'MM/DD/YYYY')}
      </div>
    );
  }
  return (
    <div>
      <Avatar src={ props.owner.avatar_url } role="presentation"/> { props.actionType.type }
    </div>
  );
};

export default ActivityItem;
