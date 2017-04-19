import React from 'react';
import {
  Avatar,
  CardTitle,
  Card,
  CardActions,
  CardText,
  Button,
  Media,
  MediaOverlay,
} from 'boldr-ui';

type Props = {
  user: Object,
  handleToggle: () => void,
  username: string,
  roleName: string,
  id: string,
  email: string,
  avatarUrl: string,
};

const MemberCard = (props: Props) => {
  const {
    user,
    handleToggle,
    username,
    roleName,
    avatarUrl,
    id,
    email,
  } = props;
  return (
    <Card>
      <CardTitle
        title={username}
        subtitle={roleName}
        avatar={<Avatar src={avatarUrl} role="presentation" />}
      />

      <CardText>
        {id}

        {email}
      </CardText>
      <CardActions>
        <Button
          raised
          primary
          label="Edit User"
          onClick={() => handleToggle(user)}
        />
      </CardActions>
    </Card>
  );
};

export default MemberCard;
