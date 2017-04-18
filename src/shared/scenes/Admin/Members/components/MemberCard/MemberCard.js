import React, {PureComponent} from 'react';
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
};

class MemberCard extends PureComponent {
  props: Props;
  render() {
    const {user, handleToggle} = this.props;

    return (
      <Card>
        <CardTitle
          title={user.username}
          subtitle={user.roles[0].name}
          avatar={<Avatar src={user.avatarUrl} role="presentation" />}
        />

        <CardText>
          {user.id}

          {user.email}
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
  }
}

export default MemberCard;
